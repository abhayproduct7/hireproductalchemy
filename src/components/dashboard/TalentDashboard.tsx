import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const TalentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            View and apply to upcoming product management opportunities.
          </p>
          <Button onClick={() => navigate("/opportunities")}>
            View Opportunities
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Keep your professional profile up to date to match with the best opportunities.
          </p>
          <Button onClick={() => navigate("/profile")}>
            Update Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};