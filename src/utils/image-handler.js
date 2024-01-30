import { storage } from "@/auth/firebaseConfig";
import {
  uploadBytes,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const uploadImage = async (files, location) => {
  try {
    const fileArray = Object.values(files);
    const uploadPromises = fileArray.map(async (file) => {
      const imageRef = ref(storage, `${location}/${file.name}`);
      const response = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(response.ref);
      return url;
    });
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.log(error);
  }
};

const deleteImage = async (file, location) => {
  const imageRef = ref(storage, `${location}/${file.name}`);
  await deleteObject(imageRef);
};

export { uploadImage, deleteImage };
