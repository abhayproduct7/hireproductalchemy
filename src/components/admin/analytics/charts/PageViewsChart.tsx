import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";

interface Event {
  created_at: string;
  event_type: string;
}

interface PageViewsChartProps {
  events: Event[];
}

export const PageViewsChart = ({ events }: PageViewsChartProps) => {
  const data = useMemo(() => {
    const pageViews = events
      .filter((event) => event.event_type === "page_view")
      .reduce((acc: Record<string, number>, event) => {
        const date = new Date(event.created_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

    return Object.entries(pageViews)
      .map(([date, count]) => ({
        date,
        views: count,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-7); // Last 7 days
  }, [events]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="views" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};