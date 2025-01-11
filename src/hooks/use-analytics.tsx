import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

// Create a session ID when the hook is first loaded
const SESSION_ID = uuidv4();

export const useAnalytics = () => {
  const location = useLocation();
  const session = useSession();
  const startTimeRef = useRef<Date>();
  const lastPageRef = useRef<string>();

  // Track page views and duration
  useEffect(() => {
    const trackPageView = async () => {
      try {
        // If there was a previous page, log its duration and mark it as exited
        if (lastPageRef.current && startTimeRef.current) {
          const duration = Math.round(
            (new Date().getTime() - startTimeRef.current.getTime()) / 1000
          );
          
          await supabase.from("analytics_events").update({
            duration_seconds: duration,
            exit_page: true,
          }).eq('session_id', SESSION_ID).eq('page_path', lastPageRef.current).is('exit_page', null);
        }

        // Log new page view
        await supabase.from("analytics_events").insert({
          event_type: "page_view",
          page_path: location.pathname,
          user_id: session?.user?.id,
          session_id: SESSION_ID,
          referrer: document.referrer,
          user_agent: navigator.userAgent,
        });

        // Update refs for duration tracking
        startTimeRef.current = new Date();
        lastPageRef.current = location.pathname;
      } catch (error) {
        console.error("Error tracking page view:", error);
      }
    };

    trackPageView();

    // Cleanup function to update duration when component unmounts
    return () => {
      if (startTimeRef.current && lastPageRef.current) {
        const duration = Math.round(
          (new Date().getTime() - startTimeRef.current.getTime()) / 1000
        );
        
        supabase.from("analytics_events").update({
          duration_seconds: duration,
          exit_page: true,
        }).eq('session_id', SESSION_ID).eq('page_path', lastPageRef.current).is('exit_page', null);
      }
    };
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