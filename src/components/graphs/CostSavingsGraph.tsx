import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { projects: 0, traditional: 0, aiEnhanced: 0 },
  { projects: 2, traditional: 30, aiEnhanced: 15 },
  { projects: 4, traditional: 55, aiEnhanced: 25 },
  { projects: 6, traditional: 75, aiEnhanced: 32 },
  { projects: 8, traditional: 90, aiEnhanced: 38 },
  { projects: 10, traditional: 100, aiEnhanced: 42 },
];

export const CostSavingsGraph = () => {
  return (
    <div className="w-full h-[400px] bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-2xl font-semibold text-primary mb-2">Cost Efficiency with AI</h3>
      <p className="text-muted-foreground mb-6">
        See how our AI-enhanced product managers help reduce project costs while maintaining quality
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="traditional" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E6EFE9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#E6EFE9" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="aiEnhanced" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0F4C35" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0F4C35" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="projects"
            label={{ value: 'Number of Projects', position: 'bottom', offset: 0 }}
            tick={{ fill: '#666' }}
          />
          <YAxis
            label={{ value: 'Relative Cost', angle: -90, position: 'left' }}
            tick={{ fill: '#666' }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Area
            type="monotone"
            dataKey="traditional"
            stroke="#8B9D93"
            fillOpacity={1}
            fill="url(#traditional)"
            name="Traditional Projects"
          />
          <Area
            type="monotone"
            dataKey="aiEnhanced"
            stroke="#0F4C35"
            fillOpacity={1}
            fill="url(#aiEnhanced)"
            name="AI-Enhanced Projects"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};