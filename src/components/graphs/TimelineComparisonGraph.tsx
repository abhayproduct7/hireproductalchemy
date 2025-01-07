import { Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const TimelineComparisonGraph = () => {
  const timelineData = [
    {
      stage: "Initial Screening",
      traditional: "5-7 days",
      ai: "24 hours",
      savings: "80%",
    },
    {
      stage: "Candidate Matching",
      traditional: "7-10 days",
      ai: "Instant",
      savings: "95%",
    },
    {
      stage: "Skills Assessment",
      traditional: "3-5 days",
      ai: "48 hours",
      savings: "70%",
    },
    {
      stage: "Interview Scheduling",
      traditional: "5-7 days",
      ai: "24-48 hours",
      savings: "75%",
    }
  ];

  return (
    <div className="w-full space-y-6 bg-white rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="h-5 w-5 text-secondary" />
        <h3 className="text-xl font-semibold text-primary">Hiring Timeline Comparison</h3>
      </div>

      <div className="grid gap-4">
        {timelineData.map((item, index) => (
          <Card key={index} className="border-muted">
            <CardContent className="p-4">
              <div className="grid grid-cols-[1fr,auto,auto] gap-4 items-center">
                <div>
                  <p className="font-medium text-primary">{item.stage}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground line-through">{item.traditional}</p>
                  <p className="text-sm font-medium text-secondary flex items-center gap-1">
                    {item.ai}
                    <CheckCircle2 className="h-4 w-4" />
                  </p>
                </div>
                <div className="bg-secondary/10 px-2 py-1 rounded">
                  <p className="text-xs font-medium text-secondary">
                    {item.savings} faster
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border-2 border-muted bg-muted/5">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            Our AI-powered platform dramatically reduces hiring timelines while maintaining 
            high-quality candidate matches. The automated system handles routine tasks instantly, 
            allowing you to focus on meaningful candidate interactions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};