import PostFeed from "@/components/PostFeed/PostFeed";
import LeftSidebar from "@/components/Sidebar/LeftSidebar";
import RightSidebar from "@/components/SuggestedUsers/RightSideBar";
import image from "../assets/1_2heEpIi8ZQT0hjUlhv3jJw.jpg";
import React from "react";
export default function HomePage() {
  const posts = [
    {
      id: 1,
      username: "johndoe",
      avatar: "/placeholder-user.jpg",
      image: image,
      likes: 120,
      comments: 15,
      caption: "Enjoying a beautiful day!",
    },
    {
      id: 2,
      username: "janedoe",
      avatar: "/placeholder-user.jpg",
      image: image,
      likes: 85,
      comments: 8,
      caption: "New adventure begins here",
    },
    {
      id: 3,
      username: "bobsmith",
      avatar: "/placeholder-user.jpg",
      image: image,
      likes: 200,
      comments: 32,
      caption: "Throwback to last summer",
    },
  ];

  const suggestedUsers = [
    {
      id: 1,
      username: "alice",
      avatar: image,
      mutualFriends: 5,
    },
    {
      id: 2,
      username: "charlie",
      avatar: image,
      mutualFriends: 3,
    },
    {
      id: 3,
      username: "david",
      avatar: image,
      mutualFriends: 7,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* <LeftSidebar /> */}
      <PostFeed posts={posts} />
      <RightSidebar suggestedUsers={suggestedUsers} />
    </div>
  );
}
