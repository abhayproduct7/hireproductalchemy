import { useSession } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload } from "lucide-react";
import { SkillsSection } from "./professional/SkillsSection";

export const ProfessionalExperience = () => {
  const session = useSession();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      if (!session?.user) return;

      try {
        const { data: applicationData } = await supabase
          .from('candidate_applications')
          .select('id')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (applicationData) {
          setApplicationId(applicationData.id);
        }
      } catch (error) {
        console.error('Error fetching application:', error);
        toast({
          title: "Error",
          description: "Failed to load application data. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchApplication();
  }, [session?.user, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
    }
  };

  const handleUpload = async () => {
    if (!session?.user || !cvFile) return;

    setIsUploading(true);
    try {
      const fileExt = cvFile.name.split('.').pop();
      const filePath = `${session.user.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, cvFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('candidate_applications')
        .update({ cv_url: publicUrl })
        .eq('user_id', session.user.id);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Your CV has been uploaded successfully.",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resume / CV</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="cv">Upload CV</Label>
            <Input
              id="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("cv")?.click()}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              {cvFile ? cvFile.name : "Select File"}
            </Button>
          </div>
          {cvFile && (
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload CV"
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      <SkillsSection applicationId={applicationId} />

      <Card>
        <CardHeader>
          <CardTitle>Case Studies</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Share your product management case studies to showcase your experience.
          </p>
          <Button>Add Case Study</Button>
        </CardContent>
      </Card>
    </div>
  );
};