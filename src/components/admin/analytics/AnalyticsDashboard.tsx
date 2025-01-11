import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageViewsChart } from "./charts/PageViewsChart";
import { EventsTable } from "./EventsTable";

export const AnalyticsDashboard = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["analytics-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("analytics_events")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Page Views Over Time</h3>
          <PageViewsChart events={events || []} />
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Events</h3>
          <EventsTable events={events || []} />
        </Card>
      </div>
    </div>
  );
};