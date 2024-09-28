import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Post from "./Post";
import PostNotFound from "../NotFound/PostNotFound";

export default function PostFeed({ posts }) {
  return (
    <main className="flex-1 overflow-auto">
      <ScrollArea className="h-full">
        <div className="max-w-2xl mx-auto py-8 px-4">
          {posts.length === 0 ? (
            <PostNotFound />
          ) : (
            posts.map((post) => (
              <Post key={post.id} post={post} /> // Render each post
            ))
          )}
        </div>
      </ScrollArea>
    </main>
  );
}
