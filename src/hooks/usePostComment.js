import useAuthStore from "@/store/authStore";
import usePostStore from "@/store/postStore";
import { useState } from "react";
import { useToast } from "./use-toast";
import { firestore } from "@/firebase/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);
  const { toast } = useToast();

  const handlePostComment = async (postId, comment) => {
    if (isCommenting) return;
    if (!authUser)
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "You must be logged in to comment",
      });
    setIsCommenting(true);
    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
    };
    addComment(postId, newComment);
    try {
      await updateDoc(doc(firestore, "posts", postId), {
        comments: arrayUnion(newComment),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    } finally {
      setIsCommenting(false);
    }
  };

  return { isCommenting, handlePostComment };
};

export default usePostComment;
