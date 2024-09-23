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

export default function Post({ post }) {
  return (
    <Card className="mb-8">
      <CardHeader className=" p-3 flex flex-row items-center space-y-0 ">
        <Avatar className="h-8 w-8">
          <AvatarImage src={post.avatar} alt={post.username} />
          <AvatarFallback>{post.username[0]}</AvatarFallback>
        </Avatar>
        <span className="font-semibold ml-2">{post.username}</span>
        <Button
          variant="ghost"
          className="ml-auto flex justify-center items-center"
        >
          follow
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <img
          src={post.image}
          alt={`Post by ${post.username}`}
          className="w-full h-auto"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-4">
        <div className="flex items-center w-full mb-2">
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-5 w-5" />
          </Button>
        </div>
        <p className="font-semibold text-sm">{post.likes} likes</p>
        <p className="text-sm mb-1">
          <span className="font-semibold">{post.username}</span> {post.caption}
        </p>
        <Button
          variant="link"
          size="sm"
          className="p-0 h-auto text-muted-foreground"
        >
          View all {post.comments} comments
        </Button>
        <div className="w-full mt-2 flex items-center">
          <Input placeholder="Add a comment..." />
          <Button variant="ghost" size="icon" className="ml-2">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
