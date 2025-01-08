import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createBrowserClient } from "@supabase/ssr";
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
import { ChatBot } from "./components/ChatBot";
import { Toaster } from "@/components/ui/toaster";

// Create a client
const queryClient = new QueryClient();

// Initialize Supabase client
const supabaseClient = createBrowserClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hire" element={<HireTalent />} />
            <Route path="/join" element={<JoinCommunity />} />
            <Route path="/requirements" element={<RequirementsCapture />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <ChatBot />
          <Toaster />
        </Router>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;