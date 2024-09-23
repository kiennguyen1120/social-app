import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useToast } from "./use-toast";
import useAuthStore from "@/store/authStore";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";

const useLogin = () => {
  const { toast } = useToast();

  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all the fields.",
      });
    }
    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);

        console.log(docRef);

        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());

        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log("User data:", userData);
          localStorage.setItem("user-info", JSON.stringify(userData));
          loginUser(userData);
        } else {
          throw new Error("User data not found.");
        }
      } else {
        throw new Error("Login failed. Please try again.");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    }
  };

  return { loading, error, login };
};

export default useLogin;
