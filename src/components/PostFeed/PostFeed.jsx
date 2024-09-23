import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Post from "./Post";

export default function PostFeed({ posts }) {
  return (
    <main className="flex-1 overflow-auto">
      <ScrollArea className="h-full">
        <div className="max-w-2xl mx-auto py-8 px-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </ScrollArea>
    </main>
  );
}
