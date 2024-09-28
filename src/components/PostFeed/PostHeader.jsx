import { Link } from "react-router-dom";
import { CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import useFollowUser from "@/hooks/useFollowUser";
import ProfileUserImg from "../../assets/profile-user.jpg";

const PostHeader = ({ post, creatorProfile }) => {
  const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(
    post.createdBy
  );
  console.log(creatorProfile);

  return (
    <>
      <CardHeader className=" p-3 flex flex-row items-center space-y-0 ">
        <Link to={`/${creatorProfile.username}`}>
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={creatorProfile.profilePicURL || ProfileUserImg}
              alt="user profile pic"
            />
            <AvatarFallback>{creatorProfile.username}</AvatarFallback>
          </Avatar>
        </Link>
        <Link to={`/${creatorProfile.username}`}>
          <span className="font-semibold ml-2">{creatorProfile.username}</span>
        </Link>

        <Button
          variant="ghost"
          className="ml-auto flex justify-center items-center"
          onClick={handleFollowUser}
          disabled={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
    </>
  );
};
export default PostHeader;
