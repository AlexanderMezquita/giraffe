import { storage } from "@/auth/firebaseConfig";
import {
  uploadBytes,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const uploadImage = async (file, location) => {
  const imageRef = ref(storage, `${location}/${file.name}`);
  const response = await uploadBytes(imageRef, file);
  const url = await getDownloadURL(response.ref);
  return url;
};

const deleteImage = async (file, location) => {
  const imageRef = ref(storage, `${location}/${file.name}`);
  await deleteObject(imageRef);
};

export { uploadImage, deleteImage };
