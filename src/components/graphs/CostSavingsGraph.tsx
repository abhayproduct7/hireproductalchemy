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
    <div className="w-full h-[300px] bg-white rounded-xl p-4">
      <h3 className="text-xl font-semibold text-primary mb-1">Cost Efficiency with AI</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
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
            label={{ value: 'PROJECTS', position: 'bottom', offset: -5, style: { fontSize: '12px' } }}
            tick={{ fontSize: 11 }}
            axisLine={{ stroke: '#666' }}
          />
          <YAxis
            label={{ 
              value: 'COST', 
              angle: -90, 
              position: 'insideLeft',
              offset: 10,
              style: { fontSize: '12px' }
            }}
            tick={{ fontSize: 11 }}
            axisLine={{ stroke: '#666' }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          />
          <text
            x="70%"
            y="15%"
            textAnchor="middle"
            style={{ 
              fontFamily: 'serif',
              fontSize: '16px',
              fontStyle: 'italic'
            }}
          >
            Savings from AI
          </text>
          <Area
            type="monotone"
            dataKey="traditional"
            name="Traditional Projects"
            stroke="#8B9D93"
            fillOpacity={1}
            fill="url(#traditional)"
          />
          <Area
            type="monotone"
            dataKey="aiEnhanced"
            name="AI-Enhanced Projects"
            stroke="#0F4C35"
            fillOpacity={1}
            fill="url(#aiEnhanced)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};