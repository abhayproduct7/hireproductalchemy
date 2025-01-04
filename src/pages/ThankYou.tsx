import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Thank You!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          We've received your requirements and will be in touch with matched candidates soon.
        </p>
        <Button onClick={() => navigate("/hire")} className="group">
          View Available Product Managers
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default ThankYou;