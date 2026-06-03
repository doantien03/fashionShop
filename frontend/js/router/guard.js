import { getToken } from "../utils/storage.js";

export function requireAuth(){
   const token = getToken();
   if(!token){
      history.pushState({},"","/login");
      window.renderRoute("/login");
      return false;
   }
   return true;
}