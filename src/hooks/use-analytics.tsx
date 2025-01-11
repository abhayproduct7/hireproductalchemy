import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

// Create a session ID when the hook is first loaded
const SESSION_ID = uuidv4();

export const useAnalytics = () => {
  const location = useLocation();
  const session = useSession();

  // Track page views
  useEffect(() => {
    const trackPageView = async () => {
      try {
        await supabase.from("analytics_events").insert({
          event_type: "page_view",
          page_path: location.pathname,
          user_id: session?.user?.id,
          session_id: SESSION_ID,
          referrer: document.referrer,
          user_agent: navigator.userAgent,
        });
      } catch (error) {
        console.error("Error tracking page view:", error);
      }
    };

    trackPageView();
  }, [location.pathname, session?.user?.id]);

  // Function to track custom events
  const trackEvent = async (eventType: string, additionalData?: Record<string, any>) => {
    try {
      await supabase.from("analytics_events").insert({
        event_type: eventType,
        page_path: location.pathname,
        user_id: session?.user?.id,
        session_id: SESSION_ID,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error tracking event:", error);
    }
  };

  return { trackEvent };
};