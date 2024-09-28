import { useState } from "react";
import PostModal from "./PostModal";
import useGetUserPosts from "@/hooks/useGetUserPosts";
import { Skeleton } from "../ui/skeleton";

export default function ProfilePosts() {
  const [selectedPost, setSelectedPost] = useState(null);

  const { isLoading, posts } = useGetUserPosts();
  const noPostsFound = !isLoading && posts.length === 0;
  if (noPostsFound) return <NoPostsFound />;

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      {!isLoading ? (
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="aspect-square relative cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <img
                src={post.imageURL}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          ))}
        </div>
      ) : (
        <SkeletonLoader />
      )}

      {selectedPost && (
        <PostModal
          selectedPost={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </>
  );
}

const SkeletonLoader = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4 animate-pulse">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex space-x-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
};

const NoPostsFound = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-semibold">No Posts Found 🤔</h1>
    </div>
  );
};
