import useGetUserProfileById from "@/hooks/useGetUserProfileById";
import { Link } from "react-router-dom";
import { timeAgo } from "../utils/timeAgo";

const CommentItem = ({ comment }) => {
  const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);

  if (isLoading) return <p>Loading...</p>;
  if (!userProfile) return null;
  return (
    <>
      <div className="flex items-center mb-2">
        <div className="ml-2">
          <Link to={`/${userProfile.username}`}>
            <span className="font-semibold mr-2 text-sm">
              {userProfile.username}
            </span>
          </Link>
          <span className="text-sm">{comment.comment}</span>{" "}
          <span className="ml-2 text-gray-500 text-xs">
            {timeAgo(comment.createdAt)}
          </span>
        </div>
      </div>
    </>
  );
};
export default CommentItem;
