import { app } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const Auth = getAuth(app);

export default Auth;
