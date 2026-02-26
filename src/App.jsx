import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Lock } from "lucide-react";

// --- PAGES ---
import Layout from "./layout/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import InvitePreview from "./pages/InvitePreview";
import JoinPartner from "./pages/JoinPartner";
import Onboarding from "./pages/Onboarding";
import WelcomeQuestions from "./pages/WelcomeQuestions";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Planner from "./pages/Planner";
import Game from "./pages/Game";
import Chat from "./pages/Chat";
import Vault from "./pages/Vault";
import Journey from "./pages/Journey";
import History from "./pages/History";
import Preferences from "./pages/Preferences";
import Journal from "./pages/Journal";
import Goals from "./pages/Goals";

/**
 * 1. Feature Gate Component
 * Prevents access to shared features if the user isn't paired.
 */
const FeatureGate = ({ children, featureName }) => {
  const { user } = useAuth();
  if (user?.mode === "couple") return children;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-4">
        <Lock className="text-slate-400" size={28} />
      </div>
      <h2 className="text-xl font-black uppercase italic tracking-tighter">
        Shared {featureName}
      </h2>
      <p className="text-slate-500 text-sm max-w-xs mt-2 font-medium">
        This space unlocks once your partner joins. Send them your invite code
        to start sharing!
      </p>
    </div>
  );
};

/**
 * 2. Protected Route Wrapper
 * Handles Login and Onboarding enforcement.
 */
const ProtectedWrapper = () => {
  const { user, loading } = useAuth();

  // Wait until auth check finishes
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse font-bold text-slate-400">Loading...</div>
      </div>
    );
  }

  // If no user is logged in, send them to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in but not onboarded, force the setup flow
  if (!user.onboarded) {
    return !user.nickname ? <Onboarding /> : <WelcomeQuestions />;
  }

  // Otherwise, wrap the page in the main Layout (Sidebar/Nav)
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

/**
 * 3. Main App Component
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-shell min-h-screen">
          <Routes>
            {/* --- PUBLIC ROUTES --- */}
            {/* Landing page is now the exclusive owner of the root path */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* --- UNIVERSAL ROUTES --- */}
            {/* Accessible whether logged in or not */}
            <Route path="/join/:code" element={<InvitePreview />} />
            <Route path="/enter-code" element={<JoinPartner />} />

            {/* --- PROTECTED ROUTES --- */}
            {/* These require a valid token and completed onboarding */}
            <Route element={<ProtectedWrapper />}>
              {/* Explicit dashboard path */}
              <Route path="/dashboard" element={<Home />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/game" element={<Game />} />
              <Route path="/journey" element={<Journey />} />
              <Route path="/history" element={<History />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/goals" element={<Goals />} />

              {/* Gated Features */}
              <Route
                path="/chat"
                element={
                  <FeatureGate featureName="Chat">
                    <Chat />
                  </FeatureGate>
                }
              />

              <Route
                path="/vault"
                element={
                  <FeatureGate featureName="Vault">
                    <Vault />
                  </FeatureGate>
                }
              />
            </Route>

            {/* --- 404 / REDIRECTS --- */}
            {/* If a route doesn't exist, send them back to the Landing page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
