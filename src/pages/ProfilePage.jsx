import ProfileHeader from "@/components/Profile/ProfileHeader";
import { useParams } from "react-router-dom";
import useGetUserProfileByUsername from "@/hooks/useGetUserProfileByUsername";

import UserNotFound from "@/components/NotFound/UserNotFound";
import ProfilePosts from "@/components/Profile/ProfilePosts";

export default function ProfilePage() {
  const { username } = useParams();

  const { isLoading, userProfile } = useGetUserProfileByUsername(username);
  const userNotFound = !isLoading && !userProfile;
  if (userNotFound) return <UserNotFound />;

  return (
    <div className="container mx-auto py-10 px-10">
      {!isLoading && userProfile && <ProfileHeader />}
      <ProfilePosts />
    </div>
  );
}
