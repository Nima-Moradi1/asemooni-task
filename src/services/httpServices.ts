import axios from "axios";
import Cookies from "js-cookie";


export const app = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  });

  // چون بعضی از ریکوعست هامون نیاز به توکن دارن باید این توکن رو به هدر اضافه کنیم
  app.interceptors.request.use(
    (config) =>  {
      const token = Cookies.get("token");
      console.log("Token __________:", token);
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );
  

  const http = {
    get : app.get,
    patch : app.patch,
    put : app.put,
    post : app.post,
    delete : app.delete
}
export default http ;