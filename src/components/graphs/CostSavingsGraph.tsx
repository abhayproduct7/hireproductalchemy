import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign, TrendingDown } from "lucide-react";

export const CostSavingsGraph = () => {
  return (
    <div className="w-full space-y-4 bg-white rounded-xl p-6">
      <h3 className="text-xl font-semibold text-primary mb-4">Cost Comparison</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-2 border-muted p-4">
          <CardContent className="p-0 space-y-3">
            <div className="flex items-center justify-center bg-muted/20 rounded-full w-12 h-12">
              <CircleDollarSign className="w-6 h-6 text-muted-foreground" />
            </div>
            <h4 className="font-semibold text-lg">Traditional Hiring</h4>
            <div className="text-3xl font-bold text-muted-foreground">$15,000</div>
            <p className="text-sm text-muted-foreground">per month</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary p-4 bg-primary/5">
          <CardContent className="p-0 space-y-3">
            <div className="flex items-center justify-center bg-primary/20 rounded-full w-12 h-12">
              <TrendingDown className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-lg">AI-Enhanced</h4>
            <div className="text-3xl font-bold text-primary">$6,000</div>
            <p className="text-sm text-primary">per month</p>
            <div className="mt-2 inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              60% Cost Savings
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};