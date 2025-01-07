import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CircleDollarSign, TrendingDown, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const CostSavingsGraph = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full space-y-6 bg-white rounded-xl p-6">
      <h3 className="text-xl font-semibold text-primary mb-4">Cost Comparison</h3>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">Traditional Hiring</span>
            </div>
            <span className="text-xl font-bold text-muted-foreground">$15,000</span>
          </div>
          <Progress value={100} className="h-3 bg-muted" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              <span className="font-medium">AI-Enhanced Hiring</span>
            </div>
            <span className="text-xl font-bold text-primary">$6,000</span>
          </div>
          <Progress value={40} className="h-3" />
          <div className="flex justify-end">
            <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
              60% Cost Savings
            </div>
          </div>
        </div>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-6">
        <Card className="border-2 border-muted bg-muted/5">
          <CardContent className="p-4">
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <p className="text-sm text-muted-foreground">
                Switch to AI-enhanced hiring and save up to $9,000 per month while maintaining high-quality talent acquisition.
              </p>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="text-sm space-y-3">
                <h4 className="font-semibold">Traditional Hiring Costs ($15,000/month):</h4>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Recruitment Agency Fees: $8,000</li>
                  <li>Internal HR Time: $3,000</li>
                  <li>Job Board Postings: $2,000</li>
                  <li>Screening & Interview Process: $2,000</li>
                </ul>
                
                <h4 className="font-semibold mt-4">AI-Enhanced Hiring Costs ($6,000/month):</h4>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Platform Subscription: $4,000</li>
                  <li>AI-Powered Screening: $1,000</li>
                  <li>Automated Interview Scheduling: $500</li>
                  <li>Quality Assurance: $500</li>
                </ul>
                
                <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                  <p className="text-primary font-medium">Monthly Savings: $9,000</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    These calculations are based on average industry costs for hiring mid to senior-level product managers, including all associated overhead and operational expenses.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </CardContent>
        </Card>
      </Collapsible>
    </div>
  );
};