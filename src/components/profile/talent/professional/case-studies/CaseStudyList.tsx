import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  outcome: string;
  attachments: Array<{ url: string; name: string }> | null;
}

interface CaseStudyListProps {
  applicationId: string | null;
}

export const CaseStudyList = ({ applicationId }: CaseStudyListProps) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCaseStudies = async () => {
    if (!applicationId) return;

    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('application_id', applicationId);

      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, [applicationId]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (caseStudies.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-4">
        No case studies added yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {caseStudies.map((study) => (
        <Card key={study.id}>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">{study.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{study.description}</p>
            <p className="text-sm mb-2">
              <strong>Outcome:</strong> {study.outcome}
            </p>
            {study.attachments && study.attachments.length > 0 && (
              <div className="text-sm">
                <strong>Attachments:</strong>
                {study.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-primary hover:underline mt-1"
                  >
                    {attachment.name}
                  </a>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};