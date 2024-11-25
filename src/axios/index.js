import axios from "axios";
import Auth from "../auth/firebaseAuthContext";
import { useRouter } from "next/router";

export default function useAxios() {
  // const { data: user } = useSelector((state) => state.user);
  const router = useRouter();

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  axiosInstance.interceptors.request.use(
    function (config) {
      Auth.onAuthStateChanged(function (user) {
        if (user) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          // config.headers["Content-Type"] = "application/x-www-form-urlencoded";
          config.headers["Access-Control-Allow-Credentials"] = "*";
        }
      });
      return config;
    },
    function (error) {
      // Request error
      // console.log(JSON.stringify(error.response), "hello");
      // if (error.response === "401") {
      //   console.log(error)
      //   router.push("login");
      // }
      return Promise.reject(error);
    }
  );

  //   axiosInstance.interceptors.response.use(
  //     function (config) {
  //       return config;
  //     },
  //     function (error) {
  //       // Response error
  //       // console.log(error.response.status);

  //       if (error.response.status === 401) {
  //         router.push("login");
  //       }
  //       return Promise.reject(error);
  //     }
  //   );
  return { axiosInstance };
}
