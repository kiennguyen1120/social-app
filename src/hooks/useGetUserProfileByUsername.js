import { useEffect, useState } from "react";
import { useToast } from "./use-toast";
import useUserProfileStore from "@/store/userProfileStore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

const useGetUserProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile, setUserProfile } = useUserProfileStore();

  const { toast } = useToast();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);

      try {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );
        console.log(q);

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return setUserProfile(null);

        let userDoc;
        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });

        setUserProfile(userDoc);
        console.log(userDoc);
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
  }, [setUserProfile, username]);

  return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
