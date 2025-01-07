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
      <h3 className="text-xl font-semibold text-primary mb-4">Product Development Cost Comparison</h3>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">Traditional Product Management</span>
            </div>
            <span className="text-xl font-bold text-muted-foreground">$150,000</span>
          </div>
          <Progress value={100} className="h-3 bg-muted" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              <span className="font-medium">AI-Enhanced Product Management</span>
            </div>
            <span className="text-xl font-bold text-primary">$90,000</span>
          </div>
          <Progress value={60} className="h-3" />
          <div className="flex justify-end">
            <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
              40% Cost Reduction
            </div>
          </div>
        </div>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-6">
        <Card className="border-2 border-muted bg-muted/5">
          <CardContent className="p-4">
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <p className="text-sm text-muted-foreground">
                See how AI-enhanced product managers reduce development costs while maintaining high-quality product delivery
              </p>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="text-sm space-y-3">
                <h4 className="font-semibold">Traditional Product Management Costs (Per Quarter: $150,000):</h4>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Market Research & Analysis: $30,000</li>
                  <li>Requirements Documentation: $25,000</li>
                  <li>Feature Planning & Prioritization: $35,000</li>
                  <li>Stakeholder Management: $30,000</li>
                  <li>Quality Assurance & Testing: $30,000</li>
                </ul>
                
                <h4 className="font-semibold mt-4">AI-Enhanced Product Management Costs (Per Quarter: $90,000):</h4>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Market Research & Analysis (AI-Assisted): $15,000</li>
                  <li>Requirements Documentation (AI-Generated): $10,000</li>
                  <li>Feature Planning & Prioritization (AI-Optimized): $25,000</li>
                  <li>Stakeholder Management: $25,000</li>
                  <li>Quality Assurance & Testing (AI-Enhanced): $15,000</li>
                </ul>
                
                <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                  <p className="text-primary font-medium">Quarterly Savings: $60,000</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    AI-enhanced product managers leverage advanced tools and automation to significantly reduce time spent on documentation, research, and analysis while improving accuracy. This allows them to focus more on strategic decision-making and stakeholder relationships, resulting in both cost savings and better product outcomes.
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