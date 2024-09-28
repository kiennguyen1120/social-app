import { firestore } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useToast } from "./use-toast";

const useGetUserProfileById = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const { toast } = useToast();
  useEffect(() => {
    const getUserProfile = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setUserProfile(null);
      try {
        const userRef = doc(firestore, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserProfile(userSnap.data());
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [toast, userId]);

  return { isLoading, userProfile };
};

export default useGetUserProfileById;
