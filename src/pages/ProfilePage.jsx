import PostGrid from "@/components/Profile/PostGrid";
import PostModal from "@/components/Profile/PostModal";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import React, { useState } from "react";
import image from "../assets/1_2heEpIi8ZQT0hjUlhv3jJw.jpg";

export default function ProfilePage() {
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: 1,
      image: image,
      likes: 120,
      comments: 15,
      username: "janedoe",
      caption: "New adventure begins here",
    },
    {
      id: 2,
      image: image,
      likes: 85,
      username: "janedoe",
      caption: "New adventure begins here",
      comments: 15,
    },
    {
      id: 3,
      image: image,
      likes: 85,
      comments: 8,
      username: "janedoe",
      caption: "New adventure begins here",
    },
    {
      id: 4,
      image: image,
      likes: 85,
      comments: 8,
      username: "janedoe",
      caption: "New adventure begins here",
    },
  ];

  return (
    <div className="container mx-auto py-10 px-10">
      <ProfileHeader />
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <PostGrid posts={posts} onPostClick={setSelectedPost} />
      <PostModal
        selectedPost={selectedPost}
        onClose={() => setSelectedPost(null)}
        posts={posts}
      />
    </div>
  );
}
