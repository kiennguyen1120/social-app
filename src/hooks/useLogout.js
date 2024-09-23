import { useSignOut } from "react-firebase-hooks/auth";

import { useToast } from "./use-toast";
import { auth } from "@/firebase/firebase";
import useAuthStore from "@/store/authStore";
const useLogout = () => {
  const { toast } = useToast();

  const [signOut, isLoggingOut, error] = useSignOut(auth);
  const logoutUser = useAuthStore((state) => state.logout);
  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      logoutUser();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    }
  };

  return { handleLogout, isLoggingOut, error };
};

export default useLogout;
