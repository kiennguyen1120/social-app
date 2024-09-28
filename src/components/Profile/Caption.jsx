import { Link } from "react-router-dom";
import { timeAgo } from "../utils/timeAgo";
import useUserProfileStore from "@/store/userProfileStore";
import ProfileUserImg from "../../assets/profile-user.jpg";
const Caption = ({ selectedPost }) => {
  const userProfile = useUserProfileStore((state) => state.userProfile);
  return (
    <>
      <div className="flex items-center mb-2">
        <div className="ml-2">
          <Link to={`/${userProfile.username}`}>
            <span className="font-semibold mr-2 text-sm">
              {userProfile.username}
            </span>
          </Link>
          <span className="text-sm">{selectedPost.caption}</span>{" "}
          <span className="ml-2 text-gray-500 text-xs">
            {timeAgo(selectedPost.createdAt)}
          </span>
        </div>
      </div>
    </>
  );
};
export default Caption;
