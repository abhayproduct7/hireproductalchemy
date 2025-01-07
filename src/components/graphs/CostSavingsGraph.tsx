import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CircleDollarSign, TrendingDown } from "lucide-react";

export const CostSavingsGraph = () => {
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

      <Card className="mt-6 border-2 border-muted bg-muted/5">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            Switch to AI-enhanced hiring and save up to $9,000 per month while maintaining high-quality talent acquisition.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};