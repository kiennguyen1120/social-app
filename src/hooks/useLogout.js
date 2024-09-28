import { useSignOut } from "react-firebase-hooks/auth";

import { useToast } from "./use-toast";
import { auth } from "@/firebase/firebase";
import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [signOut, isLoggingOut, error] = useSignOut(auth);
  const logoutUser = useAuthStore((state) => state.logout);
  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      logoutUser();
      navigate("/");
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
