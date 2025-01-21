import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const CostSavingsGraph = () => {
  const data = [
    { month: '3mo', traditional: 30, producthire: 20 },
    { month: '6mo', traditional: 60, producthire: 35 },
    { month: '9mo', traditional: 90, producthire: 45 },
    { month: '1yr', traditional: 120, producthire: 55 },
  ];

  return (
    <div className="w-full space-y-4 sm:space-y-6 bg-white rounded-xl p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2 sm:mb-4">Cost Comparison</h3>
      
      <div className="w-full h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              label={{ 
                value: 'Project Duration', 
                position: 'insideBottom', 
                offset: -10,
                style: { 
                  textAnchor: 'middle',
                  fontSize: '0.75rem',
                  '@media (min-width: 640px)': {
                    fontSize: '0.875rem'
                  }
                }
              }}
              tick={{ fontSize: 12 }}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis 
              label={{ 
                value: 'Cost', 
                angle: -90, 
                position: 'insideLeft',
                offset: 0,
                style: { 
                  textAnchor: 'middle',
                  fontSize: '0.75rem',
                  '@media (min-width: 640px)': {
                    fontSize: '0.875rem'
                  }
                }
              }}
              tickFormatter={() => ''} 
              width={30}
            />
            <Legend 
              verticalAlign="top"
              height={36}
              wrapperStyle={{
                fontSize: '0.75rem',
                '@media (min-width: 640px)': {
                  fontSize: '0.875rem'
                },
                paddingTop: "5px",
                paddingBottom: "5px"
              }}
              formatter={(value) => {
                if (value === 'traditional') return 'Traditional PM';
                if (value === 'producthire') return 'ProductHire AI';
                return value;
              }}
            />
            <Line
              type="monotone"
              dataKey="traditional"
              name="Traditional PM"
              stroke="#8E9196"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="producthire"
              name="ProductHire AI"
              stroke="#9b87f5"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <Card className="border-2 border-[#9b87f5]/10 bg-[#9b87f5]/5">
        <CardContent className="p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-center text-[#222222] font-medium">
            Reduce operational costs while maintaining high-quality product delivery
          </p>
          <div className="mt-2 sm:mt-4 flex justify-center">
            <div className="bg-[#9b87f5]/10 text-[#7E69AB] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold">
              Cost-Effective Solution
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};