import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Login from "./pages/Login";
import HireTalent from "./pages/HireTalent";
import RequirementsCapture from "./pages/RequirementsCapture";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ThankYou from "./pages/ThankYou";
import JoinCommunity from "./pages/JoinCommunity";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAnalytics from "./pages/admin/Analytics";
import AuthCallback from "./pages/AuthCallback";
import EmailConfirmation from "./pages/EmailConfirmation";
import { ChatBot } from "./components/ChatBot";
import { Toaster } from "@/components/ui/toaster";
import { useAnalytics } from "@/hooks/use-analytics";

// Create a client
const queryClient = new QueryClient();

// Analytics wrapper component
const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  useAnalytics(); // This will track page views automatically
  return <>{children}</>;
};

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <SessionContextProvider supabaseClient={supabase}>
          <Router>
            <AnalyticsWrapper>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/hire" element={<HireTalent />} />
                <Route path="/join" element={<JoinCommunity />} />
                <Route path="/join-community" element={<JoinCommunity />} />
                <Route path="/requirements" element={<RequirementsCapture />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/email-confirmation" element={<EmailConfirmation />} />
              </Routes>
              <ChatBot />
              <Toaster />
            </AnalyticsWrapper>
          </Router>
        </SessionContextProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;