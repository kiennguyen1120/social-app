import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function PostModal({ selectedPost, onClose, posts }) {
  if (!selectedPost) return null;

  return (
    <Dialog open={selectedPost !== null} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Post Details</DialogTitle>
        </DialogHeader>
        <div>
          <img
            src={selectedPost.image}
            alt={`Post ${selectedPost.id}`}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className="flex flex-col mt-4  items-start">
          <div className="flex items-center space-x-4 mb-2">
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              {selectedPost.likes} Likes
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              {selectedPost.comments} Comments
            </Button>
          </div>
          <p className="text-sm mb-2">
            <span className="font-semibold">{selectedPost.username}</span>{" "}
            {selectedPost.caption}
          </p>
          <Button
            variant="link"
            size="sm"
            className="p-0 h-auto text-muted-foreground mb-2"
          >
            View all {selectedPost.comments} comments
          </Button>
          <div className="w-full mt-2 flex items-center">
            <Input placeholder="Add a comment..." />
            <Button variant="ghost" size="icon" className="ml-2">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
