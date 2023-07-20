import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "@/auth/firebaseConfig";

const postImage = async (file, location) => {
  try {
    const storage = getStorage(app);
    const storageRef = ref(storage, location);
    const response = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(response.ref);
    return url;
  } catch (error) {
    console.log(error);
  }
};
export default postImage;
