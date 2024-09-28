import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Heart,
  HeartCrack,
  HeartOff,
  HeartPulse,
  LucideHeartOff,
  MessageCircle,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "@/firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "@/store/userProfileStore";
import useAuthStore from "@/store/authStore";
import usePostStore from "@/store/postStore";
import usePostComment from "@/hooks/usePostComment";
import { timeAgo } from "../utils/timeAgo";
import useGetUserProfileById from "@/hooks/useGetUserProfileById";
import ProfileUserImg from "../../assets/profile-user.jpg";
import { Link } from "react-router-dom";
import CommentItem from "./CommentItem";
import Caption from "./Caption";
import useLikePost from "@/hooks/useLikePost";

export default function PostModal({ selectedPost, onClose }) {
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
  const { toast } = useToast();
  const { isCommenting, handlePostComment } = usePostComment();

  const [commentText, setCommentText] = useState("");

  const [localComments, setLocalComments] = useState(selectedPost.comments);

  const { handleLikePost, isLiked, likes } = useLikePost(selectedPost);

  // // const commentRef = useRef(null);
  // const { userProfileById, isLoading } = useGetUserProfileById(
  //   comment.createdBy
  // );
  // console.log(userProfileById);

  if (!selectedPost) return null;

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      const imageRef = ref(storage, `posts/${selectedPost.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, "users", authUser.uid);
      await deleteDoc(doc(firestore, "posts", selectedPost.id));

      await updateDoc(userRef, {
        posts: arrayRemove(selectedPost.id),
      });

      deletePost(selectedPost.id);
      decrementPostsCount(selectedPost.id);

      toast({
        title: "Success",
        description: "Post deleted successfully.",
      });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    } finally {
      setIsDeleting(false);
    }
  };
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      comment: commentText,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId: selectedPost.id,
    };
    setLocalComments([...localComments, newComment]);
    setCommentText("");
    await handlePostComment(selectedPost.id, commentText);
  };

  return (
    <Dialog open={selectedPost !== null} onOpenChange={onClose}>
      <DialogContent
        className="p-0 overflow-hidden max-w-3xl w-full"
        aria-labelledby="dialog-title"
        aria-describedby={undefined}
      >
        <DialogHeader className="p-4 flex flex-row items-center justify-between border-b">
          <DialogTitle className="text-lg font-semibold">
            <div className="flex items-center space-x-2">
              <Link to={`/${userProfile.username}`}>
                {" "}
                <img
                  src={userProfile.profilePicURL || ProfileUserImg}
                  alt={userProfile.username}
                  className="w-10 h-10 rounded-full border"
                />
              </Link>
              <Link to={`/${userProfile.username}`}>
                <span className="font-semibold text-lg">
                  {userProfile.username}
                </span>
              </Link>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <img
            src={selectedPost.imageURL}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between">
              <Caption selectedPost={selectedPost} />
              {authUser?.uid === userProfile.uid && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDeletePost}
                  disabled={isDeleting}
                  className="ml-auto mb-2 hover:bg-red-100"
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              )}
            </div>

            <div className="flex-grow overflow-y-auto mb-4 max-h-64">
              {/* CAPTION */}

              {/* COMMENT */}
              {localComments.map((comment, index) => (
                <CommentItem key={index} comment={comment} />
              ))}
            </div>

            <DialogFooter className="flex-col items-stretch space-y-2">
              <div className="flex flex-col items-start pt-4 w-full">
                <div className="flex items-center space-x-2 mb-2">
                  <Button variant="ghost" size="icon" onClick={handleLikePost}>
                    {!isLiked ? (
                      <Heart className="h-5 w-5" />
                    ) : (
                      <HeartOff className="h-5 w-5" />
                    )}
                  </Button>
                  <p className="font-semibold text-sm">{likes} likes</p>
                </div>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto text-muted-foreground mb-2"
                >
                  View all {localComments.length} comments
                </Button>
                {authUser && (
                  <form
                    onSubmit={handleSubmitComment}
                    className="w-full mt-2 flex items-center"
                  >
                    <Input
                      placeholder="Add a comment..."
                      className="flex-grow"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSubmitComment(e);
                        }
                      }}
                      // ref={commentRef}
                      disabled={isCommenting}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2"
                      disabled={isCommenting}
                      type="submit"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                )}
              </div>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
