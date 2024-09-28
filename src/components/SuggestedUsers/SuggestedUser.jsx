import useFollowUser from "@/hooks/useFollowUser";
import useAuthStore from "@/store/authStore";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { UserMinus, UserPlus } from "lucide-react";
import ProfileUserImg from "../../assets/profile-user.jpg";

const SuggestedUser = ({ user, setUser, onClick }) => {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
  const authUser = useAuthStore((state) => state.user);

  const onFollowUser = async () => {
    await handleFollowUser();
    setUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((follower) => follower.uid !== authUser.uid)
        : [...user.followers, authUser],
    });
  };

  return (
    <div className="space-y-4">
      <div key={user.id} className="flex items-center">
        <Link to={`/${user.username}`} onClick={onClick}>
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage
              src={user.profilePicURL || ProfileUserImg}
              alt={user.username}
            />
            <AvatarFallback>{user.username}</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-grow">
          <Link to={`/${user.username}`} onClick={onClick}>
            <p className="text-sm font-medium">{user.username}</p>
          </Link>

          <p className="text-xs text-gray-500">
            {user.followers.length} followers
          </p>
        </div>
        {authUser.uid !== user.uid && (
          <Button
            variant="outline"
            size="sm"
            onClick={onFollowUser}
            disabled={isUpdating}
          >
            {isFollowing ? (
              <>
                <UserMinus className="h-4 w-4 mr-1" />
                Unfollow
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-1" />
                Follow
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SuggestedUser;
