import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalDetailsForm } from "./personal-details/PersonalDetailsForm";
import { AvatarUpload } from "./personal-details/AvatarUpload";
import { personalDetailsSchema, type PersonalDetailsForm } from "./personal-details/schema";

export const PersonalDetails = () => {
  const session = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const form = useForm<PersonalDetailsForm>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      location: "",
      avatar_url: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (!error && data) {
          form.reset({
            full_name: data.full_name || "",
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || "",
            avatar_url: data.avatar_url || "",
          });
          setAvatarUrl(data.avatar_url);
        }
      }
    };

    fetchProfile();
  }, [session, form]);

  const onSubmit = async (values: PersonalDetailsForm) => {
    if (!session?.user) return;

    setIsLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update(values)
      .eq("id", session.user.id);

    setIsLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Your profile has been updated.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
      </CardHeader>
      <CardContent>
        <AvatarUpload
          avatarUrl={avatarUrl}
          setAvatarUrl={setAvatarUrl}
          setValue={form.setValue}
          fullName={form.watch("full_name")}
        />
        <PersonalDetailsForm
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};