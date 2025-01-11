import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Event {
  id: string;
  event_type: string;
  page_path: string;
  created_at: string;
  user_id?: string;
  duration_seconds?: number;
}

interface EventsTableProps {
  events: Event[];
}

export const EventsTable = ({ events }: EventsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Type</TableHead>
            <TableHead>Page Path</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Duration (sec)</TableHead>
            <TableHead>User ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.slice(0, 10).map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.event_type}</TableCell>
              <TableCell>{event.page_path}</TableCell>
              <TableCell>{new Date(event.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{event.duration_seconds || '-'}</TableCell>
              <TableCell>{event.user_id || "Anonymous"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};