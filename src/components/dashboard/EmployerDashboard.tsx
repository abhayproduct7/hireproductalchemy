import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const EmployerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Find Top Product Talent</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Browse our curated network of experienced product managers ready to join your team.
          </p>
          <Button onClick={() => navigate("/requirements")}>
            Post Requirements
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>View Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Review and connect with product managers that match your requirements.
          </p>
          <Button onClick={() => navigate("/matches")}>
            View Matches
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};