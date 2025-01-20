import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const CostSavingsGraph = () => {
  // Sample data to show relative cost trends over time
  const data = [
    { month: '3mo', traditional: 30, producthire: 20 },
    { month: '6mo', traditional: 60, producthire: 35 },
    { month: '9mo', traditional: 90, producthire: 45 },
    { month: '1yr', traditional: 120, producthire: 55 },
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
              left: 40,
              bottom: 40,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              label={{ 
                value: 'Project Duration', 
                position: 'insideBottom', 
                offset: -15,
                style: { textAnchor: 'middle' }
              }}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis 
              label={{ 
                value: 'Product Management Cost', 
                angle: -90, 
                position: 'insideLeft',
                offset: -25,
                style: { textAnchor: 'middle' }
              }}
              tickFormatter={() => ''} // Remove Y-axis numbers
            />
            <Tooltip />
            <Legend 
              verticalAlign="top"
              height={36}
              wrapperStyle={{
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            />
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