import { Heart, HeartOff, MessageCircle, Send } from "lucide-react";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import useLikePost from "@/hooks/useLikePost";
import { useRef, useState } from "react";
import useAuthStore from "@/store/authStore";
import usePostComment from "@/hooks/usePostComment";
import { timeAgo } from "../utils/timeAgo";
import CommentItem from "../Profile/CommentItem";

const PostFooter = ({ post, creatorProfile }) => {
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const authUser = useAuthStore((state) => state.user);
  const commentRef = useRef(null);
  const { handleLikePost, isLiked, likes } = useLikePost(post);
  const [localComments, setLocalComments] = useState(post.comments);
  const [commentText, setCommentText] = useState("");

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      comment: commentText,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId: post.id,
    };
    setLocalComments([...localComments, newComment]);
    setCommentText("");
    await handlePostComment(post.id, commentText);
  };
  return (
    <>
      <CardFooter className="flex flex-col items-start pt-4">
        <div className="flex items-center w-full mb-2">
          <Button variant="ghost" size="icon" onClick={handleLikePost}>
            {!isLiked ? (
              <Heart className="h-5 w-5" />
            ) : (
              <HeartOff className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => commentRef.current.focus()}
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </div>
        <p className="font-semibold text-sm">{likes} likes</p>
        <p className="text-sm mb-1">
          <span className="font-semibold">{creatorProfile.username}</span>{" "}
          {post.caption}
          <span className="ml-2 text-gray-500 text-xs">
            {timeAgo(post.createdAt)}
          </span>
        </p>
        <div className="w-full mt-2 mb-2 max-h-32 overflow-y-auto">
          {localComments.map((comment, index) => (
            <CommentItem key={index} comment={comment} />
          ))}
        </div>
        <Button
          variant="link"
          size="sm"
          className="p-0 h-auto text-muted-foreground"
        >
          View all {post.comments.length} comments
        </Button>
        <form
          onSubmit={handleSubmitComment}
          className="w-full mt-2 flex items-center"
        >
          <Input
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            ref={commentRef}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="ml-2"
            disabled={!commentText.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </CardFooter>
    </>
  );
};
export default PostFooter;
