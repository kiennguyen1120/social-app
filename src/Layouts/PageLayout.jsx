import Navbar from "@/components/Navbar/Navbar";
import LeftSidebar from "@/components/Sidebar/LeftSidebar";

import { Progress } from "@/components/ui/progress";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function PageLayout() {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  const canRenderSidebar = pathname !== "/auth" && user;

  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) return <Progress />;
  return (
    <div className="flex">
      {canRenderSidebar ? <LeftSidebar /> : null}
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}
