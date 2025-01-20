import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign, TrendingDown } from "lucide-react";

export const CostSavingsGraph = () => {
  return (
    <div className="w-full space-y-6 bg-white rounded-xl p-6">
      <h3 className="text-xl font-semibold text-primary mb-4">Cost Comparison</h3>
      
      <div className="relative h-64 flex items-end space-x-12 pb-8">
        {/* Traditional PM Bar */}
        <div className="flex-1 flex flex-col items-center">
          <div className="h-full w-full bg-muted rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-muted to-muted/50" />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <CircleDollarSign className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-sm">Traditional Product Management</span>
          </div>
        </div>

        {/* ProductHire Bar */}
        <div className="flex-1 flex flex-col items-center">
          <div className="h-[65%] w-full bg-secondary rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-secondary to-secondary/50" />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <TrendingDown className="w-5 h-5 text-secondary" />
            <span className="font-medium text-sm">ProductHire AI-Enhanced Talent</span>
          </div>
        </div>
      </div>

      <Card className="border-2 border-muted bg-muted/5">
        <CardContent className="p-4">
          <p className="text-sm text-center text-muted-foreground">
            ProductHire's AI-enhanced product managers significantly reduce operational costs while maintaining high-quality product delivery through improved efficiency and automated processes
          </p>
          <div className="mt-4 flex justify-center">
            <div className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-medium">
              Substantial Cost Reduction
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};