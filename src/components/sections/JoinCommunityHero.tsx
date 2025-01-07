import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

export const JoinCommunityHero = () => {
  const navigate = useNavigate();
  const session = useSession();
  const supabase = useSupabaseClient();
  const [hasApplication, setHasApplication] = useState(false);

  useEffect(() => {
    const checkExistingApplication = async () => {
      if (session?.user) {
        const { data, error } = await supabase
          .from("candidate_applications")
          .select("id")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (error) {
          console.error("Error checking application:", error);
          return;
        }

        setHasApplication(!!data);
      }
    };

    checkExistingApplication();
  }, [session, supabase]);

  const handleApplyClick = () => {
    if (!session) {
      navigate("/login");
      return;
    }

    if (hasApplication) {
      toast({
        title: "Application Already Submitted",
        description: "Thank you, we have received your application and will be in touch shortly.",
      });
      return;
    }

    window.location.hash = "application";
  };

  const handleLearnMore = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-primary animate-fade-up">
            Join Our Product Leadership Community
          </h1>
          <p className="text-lg md:text-xl text-gray-600 animate-fade-up">
            Connect with forward-thinking companies seeking experienced product leaders. 
            Shape the future of products while maintaining the flexibility you desire.
          </p>
          <div className="flex justify-center gap-4 animate-fade-up">
            <Button 
              size="lg"
              onClick={handleApplyClick}
              className="bg-primary hover:bg-primary/90"
            >
              Apply Now
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={handleLearnMore}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};