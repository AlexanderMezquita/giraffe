import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "./firebaseAuthContext";

export default function useAuth() {
  const LogIn = async (data) => {
    const { email, password } = data;
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  };

  const LogOut = async () => {
    await auth.signOut();
  };

  return { LogIn, LogOut };
}
