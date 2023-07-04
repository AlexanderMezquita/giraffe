import App from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const Auth = getAuth(App);

export default Auth;
