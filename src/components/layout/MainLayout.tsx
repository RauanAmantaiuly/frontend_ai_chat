import { Outlet } from "react-router-dom";

import { Navbar } from "../navbar/Navbar";

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
