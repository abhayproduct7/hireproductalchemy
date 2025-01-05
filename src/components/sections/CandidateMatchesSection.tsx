import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, ThumbsUp, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CandidateMatch {
  application_id: string;
  candidate_name: string;
  match_score: number;
  years_experience: number;
  availability_type: string;
  professional_summary: string;
  earliest_start_date: string;
  skills: string[];
}

export const CandidateMatchesSection = ({ requirementId }: { requirementId: number }) => {
  const [matches, setMatches] = useState<CandidateMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session?.session?.user) {
          navigate("/login");
          return;
        }

        const { data, error } = await supabase
          .from("top_candidate_matches")
          .select("*")
          .eq("requirement_id", requirementId)
          .order("match_score", { ascending: false });

        if (error) throw error;
        setMatches(data || []);
      } catch (error) {
        console.error("Error fetching matches:", error);
        toast({
          title: "Error fetching matches",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [requirementId, navigate, toast]);

  const handleSelectCandidate = async (applicationId: string) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        navigate("/login");
        return;
      }

      const { error } = await supabase.from("requirement_matches").insert({
        requirement_id: requirementId,
        application_id: applicationId,
        employer_id: session.session.user.id,
      });

      if (error) throw error;

      toast({
        title: "Candidate selected",
        description: "We'll notify the candidate of your interest.",
      });
    } catch (error) {
      console.error("Error selecting candidate:", error);
      toast({
        title: "Error selecting candidate",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading matches...</div>;
  }

  if (!matches.length) {
    return (
      <Card className="mt-8">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            No matches found for your requirements yet.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Top Matching Candidates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Match Score</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((match) => (
              <TableRow key={match.application_id}>
                <TableCell className="font-medium">{match.candidate_name}</TableCell>
                <TableCell>{Math.round(match.match_score)}%</TableCell>
                <TableCell>{match.years_experience} years</TableCell>
                <TableCell>{match.availability_type}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {match.skills?.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-secondary/20 px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {match.skills?.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{match.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSelectCandidate(match.application_id)}
                      className="gap-1"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Select
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <X className="h-4 w-4" />
                      Pass
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};