import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "./firebaseAuthContext";
import { useRouter } from "next/router";

export default function useAuth() {
  const router = useRouter();

  const LogIn = async (data) => {
    const { email, password } = data;
    const response = await signInWithEmailAndPassword(auth, email, password);
    router.push("/admin");
    return response;
  };

  const LogOut = async () => {
    await auth.signOut();
    router.reload("/login");
  };

  return { LogIn, LogOut };
}
