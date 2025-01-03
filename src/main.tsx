import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx'
import Login from './pages/Login.tsx'
import PrivacyPolicy from './pages/PrivacyPolicy.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);