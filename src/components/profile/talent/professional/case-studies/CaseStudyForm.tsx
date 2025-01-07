import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CaseStudyFormProps {
  applicationId: string | null;
  onSuccess?: () => void;
}

export const CaseStudyForm = ({ applicationId, onSuccess }: CaseStudyFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [outcome, setOutcome] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicationId) {
      toast({
        title: "Error",
        description: "Application ID is required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let attachmentUrl = null;
      
      if (file) {
        const fileExt = file.name.split('.').pop();
        const filePath = `case-studies/${applicationId}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('assets')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('assets')
          .getPublicUrl(filePath);

        attachmentUrl = publicUrl;
      }

      const { error: insertError } = await supabase
        .from('case_studies')
        .insert({
          application_id: applicationId,
          title,
          description,
          outcome,
          attachments: attachmentUrl ? [{ url: attachmentUrl, name: file?.name }] : null,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Case study added successfully",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setOutcome("");
      setFile(null);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error adding case study:', error);
      toast({
        title: "Error",
        description: "Failed to add case study. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter case study title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the case study..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="outcome">Outcome</Label>
        <Textarea
          id="outcome"
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
          placeholder="What was the outcome?"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="attachment">Attachment</Label>
        <Input
          id="attachment"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById("attachment")?.click()}
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" />
          {file ? file.name : "Upload File"}
        </Button>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding Case Study...
          </>
        ) : (
          "Add Case Study"
        )}
      </Button>
    </form>
  );
};