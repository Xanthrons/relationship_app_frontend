import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import TopBar from "../components/common/TopBar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-midnight-canvas pb-24">
      {/* Top Section: Menu & Notifications */}
      <TopBar />

      {/* Main Content Area */}
      <main className="p-4 max-w-4xl mx-auto animate-in fade-in duration-500">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
};

export default Layout;
