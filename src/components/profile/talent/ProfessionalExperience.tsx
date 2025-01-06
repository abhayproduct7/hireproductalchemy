import { useSession } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X } from "lucide-react";

export const ProfessionalExperience = () => {
  const session = useSession();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      if (!session?.user) return;

      try {
        // First get the application ID
        const { data: applicationData } = await supabase
          .from('candidate_applications')
          .select('id')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (applicationData) {
          setApplicationId(applicationData.id);

          // Then fetch skills for this application
          const { data: skillsData } = await supabase
            .from('candidate_skills')
            .select('skills(name)')
            .eq('application_id', applicationData.id);

          if (skillsData) {
            const skillNames = skillsData.map(item => item.skills.name);
            setSkills(skillNames);
          }
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
        toast({
          title: "Error",
          description: "Failed to load skills. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingSkills(false);
      }
    };

    fetchSkills();
  }, [session?.user]);

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

  const addSkill = async () => {
    if (!session?.user || !applicationId || !newSkill.trim()) return;

    try {
      // First check if skill exists
      let { data: existingSkill } = await supabase
        .from('skills')
        .select('id')
        .eq('name', newSkill.trim())
        .maybeSingle();

      let skillId;

      if (!existingSkill) {
        // Create new skill if it doesn't exist
        const { data: newSkillData, error: newSkillError } = await supabase
          .from('skills')
          .insert({ name: newSkill.trim() })
          .select('id')
          .single();

        if (newSkillError) throw newSkillError;
        skillId = newSkillData.id;
      } else {
        skillId = existingSkill.id;
      }

      // Add skill to candidate_skills
      const { error: linkError } = await supabase
        .from('candidate_skills')
        .insert({
          application_id: applicationId,
          skill_id: skillId,
        });

      if (linkError) throw linkError;

      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      
      toast({
        title: "Success",
        description: "Skill added successfully.",
      });
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: "Error",
        description: "Failed to add skill. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeSkill = async (skillToRemove: string) => {
    if (!applicationId) return;

    try {
      const { data: skillData } = await supabase
        .from('skills')
        .select('id')
        .eq('name', skillToRemove)
        .single();

      if (skillData) {
        const { error } = await supabase
          .from('candidate_skills')
          .delete()
          .eq('application_id', applicationId)
          .eq('skill_id', skillData.id);

        if (error) throw error;

        setSkills(skills.filter(skill => skill !== skillToRemove));
        
        toast({
          title: "Success",
          description: "Skill removed successfully.",
        });
      }
    } catch (error) {
      console.error('Error removing skill:', error);
      toast({
        title: "Error",
        description: "Failed to remove skill. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
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

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a skill (e.g., Agile, User Research)"
              />
              <Button type="button" onClick={addSkill}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {isLoadingSkills ? (
                <div className="flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Loading skills...
                </div>
              ) : skills.length > 0 ? (
                skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-1 bg-secondary/20 px-3 py-1 rounded-full"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No skills added yet. Add some skills to help match with opportunities.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

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