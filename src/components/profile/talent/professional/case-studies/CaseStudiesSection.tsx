import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CaseStudyForm } from "./CaseStudyForm";
import { CaseStudyList } from "./CaseStudyList";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CaseStudiesSectionProps {
  applicationId: string | null;
}

export const CaseStudiesSection = ({ applicationId }: CaseStudiesSectionProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Case Studies</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Case Study</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Case Study</DialogTitle>
            </DialogHeader>
            <CaseStudyForm applicationId={applicationId} onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Share your product management case studies to showcase your experience.
        </p>
        <CaseStudyList key={refreshKey} applicationId={applicationId} />
      </CardContent>
    </Card>
  );
};