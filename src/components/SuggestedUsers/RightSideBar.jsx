import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, UserPlus } from "lucide-react";
import useAuthStore from "@/store/authStore";
import useLogout from "@/hooks/useLogout";

export default function RightSidebar({ suggestedUsers }) {
  const { handleLogout, isLoggingOut } = useLogout();

  const authUser = useAuthStore((state) => state.user);
  if (!authUser) return null;

  return (
    <aside className="hidden lg:block w-80 bg-white border-l p-4">
      <div className="space-y-4 mb-3">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={authUser.avatar} alt={authUser.username} />
            <AvatarFallback>{authUser.username}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="text-sm font-medium">{authUser.username}</p>
            <p className="text-xs text-gray-500"> friends</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>

      <h2 className="font-semibold mb-4">Suggested Users</h2>
      <div className="space-y-4">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback>{user.username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <p className="text-sm font-medium">{user.username}</p>
              <p className="text-xs text-gray-500">
                {user.mutualFriends} friends
              </p>
            </div>
            <Button variant="outline" size="sm">
              <UserPlus className="h-4 w-4 mr-1" />
              Follow
            </Button>
          </div>
        ))}
      </div>
    </aside>
  );
}
