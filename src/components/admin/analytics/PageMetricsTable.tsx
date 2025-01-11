import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, subDays, isWithinInterval, startOfDay } from "date-fns";

interface Event {
  event_type: string;
  page_path: string;
  created_at: string;
  duration_seconds?: number;
  exit_page?: boolean;
}

interface PageMetricsTableProps {
  events: Event[];
}

interface PageMetrics {
  page: string;
  dailyViews: number;
  weeklyViews: number;
  monthlyViews: number;
  avgDuration: number;
  exits: number;
  bounceRate: string;
}

export const PageMetricsTable = ({ events }: PageMetricsTableProps) => {
  const pageMetrics = useMemo(() => {
    const metrics: Record<
      string,
      { 
        dailyViews: number;
        weeklyViews: number;
        monthlyViews: number;
        totalDuration: number;
        exits: number;
        totalViews: number;
      }
    > = {};

    const now = new Date();
    const today = startOfDay(now);
    const weekAgo = subDays(today, 7);
    const monthAgo = subDays(today, 30);

    // Filter page_view events
    const pageViews = events.filter((event) => event.event_type === "page_view");

    // Calculate metrics for each page
    pageViews.forEach((event) => {
      const { page_path, duration_seconds = 0, exit_page = false } = event;
      const eventDate = new Date(event.created_at);

      if (!metrics[page_path]) {
        metrics[page_path] = {
          dailyViews: 0,
          weeklyViews: 0,
          monthlyViews: 0,
          totalDuration: 0,
          exits: 0,
          totalViews: 0,
        };
      }

      // Increment total views
      metrics[page_path].totalViews += 1;
      metrics[page_path].totalDuration += duration_seconds;

      // Check time periods
      if (isWithinInterval(eventDate, { start: today, end: now })) {
        metrics[page_path].dailyViews += 1;
      }
      if (isWithinInterval(eventDate, { start: weekAgo, end: now })) {
        metrics[page_path].weeklyViews += 1;
      }
      if (isWithinInterval(eventDate, { start: monthAgo, end: now })) {
        metrics[page_path].monthlyViews += 1;
      }

      if (exit_page) {
        metrics[page_path].exits += 1;
      }
    });

    // Transform metrics for display
    return Object.entries(metrics)
      .map(([page, stats]) => ({
        page,
        dailyViews: stats.dailyViews,
        weeklyViews: stats.weeklyViews,
        monthlyViews: stats.monthlyViews,
        avgDuration: stats.totalViews > 0 ? Math.round(stats.totalDuration / stats.totalViews) : 0,
        exits: stats.exits,
        bounceRate: ((stats.exits / stats.totalViews) * 100).toFixed(1),
      }))
      .sort((a, b) => b.monthlyViews - a.monthlyViews); // Sort by monthly views
  }, [events]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Page</TableHead>
            <TableHead className="text-right">Today</TableHead>
            <TableHead className="text-right">This Week</TableHead>
            <TableHead className="text-right">This Month</TableHead>
            <TableHead className="text-right">Avg. Time (sec)</TableHead>
            <TableHead className="text-right">Exit Rate (%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageMetrics.map((metric) => (
            <TableRow key={metric.page}>
              <TableCell className="font-medium">{metric.page}</TableCell>
              <TableCell className="text-right">{metric.dailyViews}</TableCell>
              <TableCell className="text-right">{metric.weeklyViews}</TableCell>
              <TableCell className="text-right">{metric.monthlyViews}</TableCell>
              <TableCell className="text-right">{metric.avgDuration}</TableCell>
              <TableCell className="text-right">{metric.bounceRate}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};