import { firestore } from "@/firebase/firebase";
import { useState } from "react";
import { useToast } from "./use-toast";
import { collection, getDocs, query, where } from "firebase/firestore";

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUser(null);
    try {
      const q = query(
        collection(firestore, "users"),
        where("username", "==", username)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty)
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Could not find the user.",
        });

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
