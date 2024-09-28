import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Send } from "lucide-react";
import useGetUserProfileById from "@/hooks/useGetUserProfileById";
import useFollowUser from "@/hooks/useFollowUser";
import { Link } from "react-router-dom";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

export default function Post({ post }) {
  const { userProfile } = useGetUserProfileById(post.createdBy);

  return (
    <Card className="mb-8">
      {userProfile && (
        <>
          <PostHeader post={post} creatorProfile={userProfile} />
          <CardContent className="p-0">
            <img src={post.imageURL} alt={`Post img`} />
          </CardContent>
          <PostFooter post={post} creatorProfile={userProfile} />
        </>
      )}
    </Card>
  );
}
