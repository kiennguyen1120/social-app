import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, UserPlus } from "lucide-react";
import useAuthStore from "@/store/authStore";
import useLogout from "@/hooks/useLogout";
import { Link } from "react-router-dom";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import SuggestedUser from "./SuggestedUser";
import useUserProfileStore from "@/store/userProfileStore";
import ProfileUserImg from "../../assets/profile-user.jpg";

export default function RightSidebar() {
  const { handleLogout, isLoggingOut } = useLogout();
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();
  const authUser = useAuthStore((state) => state.user);
  if (!authUser) return null;

  return (
    <aside className="hidden lg:block w-80 bg-white border-l p-4">
      <div className="space-y-4 mb-3">
        <div className="flex items-center">
          <Link to={`${authUser.username}`}>
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage
                src={authUser.profilePicURL || ProfileUserImg}
                alt={authUser.username}
              />
              <AvatarFallback>{authUser.username}</AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex-grow">
            <Link to={`${authUser.username}`}>
              {" "}
              <p className="text-sm font-medium">{authUser.username}</p>
            </Link>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>

      <h2 className="font-semibold mb-4">Suggested Users</h2>
      <div className="space-y-4">
        {suggestedUsers.length === 0 ? (
          <p className="text-sm font-medium">No suggested users found.</p>
        ) : (
          suggestedUsers.map((user) => (
            <SuggestedUser user={user} key={user.id} />
          ))
        )}
      </div>
    </aside>
  );
}
