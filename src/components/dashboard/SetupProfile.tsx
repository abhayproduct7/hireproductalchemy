import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const SetupProfile = () => {
  const navigate = useNavigate();

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Please complete your profile to access the dashboard features.
        </p>
        <Button onClick={() => navigate("/profile")}>
          Setup Profile
        </Button>
      </CardContent>
    </Card>
  );
};