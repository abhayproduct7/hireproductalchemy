import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const CostSavingsGraph = () => {
  // Sample data to show cost trends over time
  const data = [
    { month: '1mo', traditional: 100, producthire: 60 },
    { month: '2mo', traditional: 200, producthire: 110 },
    { month: '3mo', traditional: 300, producthire: 150 },
    { month: '4mo', traditional: 400, producthire: 180 },
    { month: '5mo', traditional: 500, producthire: 200 },
    { month: '6mo', traditional: 600, producthire: 220 },
  ];

  return (
    <div className="w-full space-y-6 bg-white rounded-xl p-6">
      <h3 className="text-xl font-semibold text-primary mb-4">Cost Comparison</h3>
      
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              label={{ 
                value: 'Project Duration', 
                position: 'bottom', 
                offset: -10 
              }}
            />
            <YAxis 
              label={{ 
                value: 'Development Cost', 
                angle: -90, 
                position: 'insideLeft',
                offset: 0
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="traditional"
              name="Traditional Product Management"
              stroke="#8E9196"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="producthire"
              name="ProductHire AI-Enhanced Talent"
              stroke="#9b87f5"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
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