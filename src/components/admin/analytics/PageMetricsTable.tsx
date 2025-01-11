import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

export const PageMetricsTable = ({ events }: PageMetricsTableProps) => {
  const pageMetrics = useMemo(() => {
    const metrics: Record<
      string,
      { views: number; avgDuration: number; exits: number }
    > = {};

    // Filter page_view events
    const pageViews = events.filter((event) => event.event_type === "page_view");

    // Calculate metrics for each page
    pageViews.forEach((event) => {
      const { page_path, duration_seconds = 0, exit_page = false } = event;

      if (!metrics[page_path]) {
        metrics[page_path] = { views: 0, avgDuration: 0, exits: 0 };
      }

      metrics[page_path].views += 1;
      metrics[page_path].avgDuration =
        (metrics[page_path].avgDuration * (metrics[page_path].views - 1) +
          duration_seconds) /
        metrics[page_path].views;
      if (exit_page) {
        metrics[page_path].exits += 1;
      }
    });

    return Object.entries(metrics)
      .map(([page, stats]) => ({
        page,
        ...stats,
        bounceRate: ((stats.exits / stats.views) * 100).toFixed(1),
      }))
      .sort((a, b) => b.views - a.views);
  }, [events]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Page</TableHead>
            <TableHead className="text-right">Views</TableHead>
            <TableHead className="text-right">Avg. Time (sec)</TableHead>
            <TableHead className="text-right">Exit Rate (%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageMetrics.map((metric) => (
            <TableRow key={metric.page}>
              <TableCell className="font-medium">{metric.page}</TableCell>
              <TableCell className="text-right">{metric.views}</TableCell>
              <TableCell className="text-right">
                {Math.round(metric.avgDuration)}
              </TableCell>
              <TableCell className="text-right">{metric.bounceRate}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};