import PostFeed from "@/components/PostFeed/PostFeed";
import RightSidebar from "@/components/SuggestedUsers/RightSideBar";
import React from "react";
import useGetFeedPosts from "@/hooks/useGetFeedPosts";
export default function HomePage() {
  const { isLoading, posts } = useGetFeedPosts();

  return (
    <div className="flex h-screen bg-gray-100">
      <PostFeed posts={posts} isLoading />
      <RightSidebar />
    </div>
  );
}
