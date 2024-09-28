import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Home, LogOut, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import useLogout from "@/hooks/useLogout";
import useAuthStore from "@/store/authStore";
import CreatePostModal from "./CreatePostModal";
import UserSearchModal from "./UserSearchModal";
export default function LeftSidebar() {
  const { handleLogout, isLoggingOut } = useLogout();
  const authUser = useAuthStore((state) => state.user);
  return (
    <aside className="w-64 bg-white border-r p-4">
      <Link to="/">
        <h1 className="text-2xl font-bold mb-6">SocialApp</h1>
      </Link>
      <nav className="space-y-2">
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </Link>
        <UserSearchModal />
        <CreatePostModal />

        <Link to={`/${authUser?.username}`}>
          <Button variant="ghost" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </Link>
        <Link to={null}>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </Link>
      </nav>
    </aside>
  );
}
