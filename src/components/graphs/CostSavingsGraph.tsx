import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign, TrendingDown } from "lucide-react";

export const CostSavingsGraph = () => {
  return (
    <div className="w-full space-y-6 bg-white rounded-xl p-6">
      <h3 className="text-xl font-semibold text-primary mb-4">Cost Comparison</h3>
      
      <div className="relative h-[300px] flex items-end space-x-12 pb-8">
        {/* Traditional PM Bar */}
        <div className="flex-1 flex flex-col items-center">
          <div 
            className="w-full h-[280px] bg-gradient-to-b from-[#8E9196] to-[#C8C8C9] rounded-t-lg relative overflow-hidden shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#8E9196]/20 to-transparent" />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <CircleDollarSign className="w-5 h-5 text-[#8E9196]" />
            <span className="font-medium text-sm text-[#222222]">Traditional Product Management</span>
          </div>
        </div>

        {/* ProductHire Bar */}
        <div className="flex-1 flex flex-col items-center">
          <div 
            className="w-full h-[180px] bg-gradient-to-b from-[#9b87f5] to-[#7E69AB] rounded-t-lg relative overflow-hidden shadow-lg animate-fade-up"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#9b87f5]/20 to-transparent" />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <TrendingDown className="w-5 h-5 text-[#9b87f5]" />
            <span className="font-medium text-sm text-[#222222]">ProductHire AI-Enhanced Talent</span>
          </div>
        </div>
      </div>

      <Card className="border-2 border-[#9b87f5]/10 bg-[#9b87f5]/5">
        <CardContent className="p-4">
          <p className="text-sm text-center text-[#222222] font-medium">
            Reduce operational costs while maintaining high-quality product delivery
          </p>
          <div className="mt-4 flex justify-center">
            <div className="bg-[#9b87f5]/10 text-[#7E69AB] px-4 py-1.5 rounded-full text-sm font-semibold">
              Cost-Effective Solution
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};