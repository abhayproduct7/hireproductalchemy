import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export const ProcessComparisonGraph = () => {
  const comparisonData = [
    {
      aspect: "Time to Hire",
      traditional: "4-6 weeks",
      ai: "1-2 weeks",
      aiAdvantage: true,
    },
    {
      aspect: "Candidate Screening",
      traditional: "Manual review",
      ai: "AI-powered matching",
      aiAdvantage: true,
    },
    {
      aspect: "Interview Process",
      traditional: "Multiple rounds",
      ai: "Streamlined process",
      aiAdvantage: true,
    },
    {
      aspect: "Quality Assurance",
      traditional: "Variable",
      ai: "Consistent standards",
      aiAdvantage: true,
    },
    {
      aspect: "Skill Assessment",
      traditional: "Manual testing",
      ai: "Automated validation",
      aiAdvantage: true,
    },
  ];

  return (
    <div className="w-full space-y-6 bg-white rounded-xl p-6">
      <h3 className="text-xl font-semibold text-primary mb-4">Process Comparison</h3>
      
      <div className="grid grid-cols-[1fr,auto,auto] gap-4">
        <div className="font-medium text-muted-foreground">Aspect</div>
        <div className="font-medium text-muted-foreground text-center">Traditional</div>
        <div className="font-medium text-primary text-center">AI-Enhanced</div>

        {comparisonData.map((item, index) => (
          <>
            <div key={`aspect-${index}`} className="py-3 border-t">
              {item.aspect}
            </div>
            <div key={`trad-${index}`} className="py-3 border-t text-center text-sm">
              {item.traditional}
            </div>
            <div key={`ai-${index}`} className="py-3 border-t text-center text-sm text-primary">
              {item.ai}
            </div>
          </>
        ))}
      </div>

      <Card className="mt-6 border-2 border-muted bg-muted/5">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            AI-enhanced hiring streamlines the entire recruitment process while maintaining high standards. 
            The automated system reduces time-to-hire by 75% compared to traditional methods.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};