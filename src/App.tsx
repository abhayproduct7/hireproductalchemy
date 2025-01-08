import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import JoinCommunity from "./pages/JoinCommunity";
import HireTalent from "./pages/HireTalent";
import RequirementsCapture from "./pages/RequirementsCapture";
import ThankYou from "./pages/ThankYou";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/Dashboard";
import EmployerDetails from "./pages/admin/EmployerDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<JoinCommunity />} />
        <Route path="/hire" element={<HireTalent />} />
        <Route path="/requirements" element={<RequirementsCapture />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/employers/:employerId" element={<EmployerDetails />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </Router>
  );
}

export default App;