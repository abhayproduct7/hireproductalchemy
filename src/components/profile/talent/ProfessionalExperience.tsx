import { useSession } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, Save } from "lucide-react";
import { SkillsSection } from "./professional/SkillsSection";
import { Textarea } from "@/components/ui/textarea";

export const ProfessionalExperience = () => {
  const session = useSession();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [professionalSummary, setProfessionalSummary] = useState("");
  const [yearsExperience, setYearsExperience] = useState<number | null>(null);
  const [currentCvUrl, setCurrentCvUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      if (!session?.user) return;

      try {
        const { data: applicationData, error } = await supabase
          .from('candidate_applications')
          .select('id, professional_summary, years_experience, cv_url')
          .eq('user_id', session.user.id)
          .limit(1)
          .single();

        if (error) throw error;

        if (applicationData) {
          setApplicationId(applicationData.id);
          setProfessionalSummary(applicationData.professional_summary || '');
          setYearsExperience(applicationData.years_experience || null);
          setCurrentCvUrl(applicationData.cv_url);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching application:', error);
        toast({
          title: "Error",
          description: "Failed to load application data. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
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

      setCurrentCvUrl(publicUrl);

      const { error: updateError } = await supabase
        .from('candidate_applications')
        .update({ cv_url: publicUrl })
        .eq('user_id', session.user.id);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Your CV has been uploaded successfully.",
      });
      
      setCvFile(null);
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

  const handleSave = async () => {
    if (!session?.user) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('candidate_applications')
        .update({
          professional_summary: professionalSummary,
          years_experience: yearsExperience,
        })
        .eq('user_id', session.user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Years of Experience</Label>
            <Input
              type="number"
              value={yearsExperience || ''}
              onChange={(e) => setYearsExperience(Number(e.target.value))}
              placeholder="Enter your years of experience"
            />
          </div>
          <div className="space-y-2">
            <Label>Summary</Label>
            <Textarea
              value={professionalSummary}
              onChange={(e) => setProfessionalSummary(e.target.value)}
              placeholder="Write a summary of your professional experience..."
              className="min-h-[150px]"
            />
          </div>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="w-full"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resume / CV</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentCvUrl && (
            <div className="text-sm text-muted-foreground mb-4">
              Current CV: <a href={currentCvUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View CV</a>
            </div>
          )}
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