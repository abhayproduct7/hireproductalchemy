import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export const TalentDashboard = () => {
  const navigate = useNavigate();
  const session = useSession();

  const { data: matches, isLoading } = useQuery({
    queryKey: ["requirement_matches", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("requirement_matches")
        .select("*")
        .eq("application_id", session?.user?.id);

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const hasOpportunities = matches && matches.length > 0;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading opportunities...</p>
          ) : hasOpportunities ? (
            <>
              <p className="mb-4 text-muted-foreground">
                You have {matches.length} matching product management {matches.length === 1 ? 'opportunity' : 'opportunities'}.
              </p>
              <Button onClick={() => navigate("/opportunities")}>
                View Opportunities
              </Button>
            </>
          ) : (
            <p className="text-muted-foreground">
              There are no new opportunities available at the moment. We'll notify you when new opportunities that match your profile become available.
            </p>
          )}
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