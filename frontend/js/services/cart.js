import {getToken} from "../utils/storage.js";
import { ENDPOINTS,getHeaders } from "../config/apiConfig.js";

// lấy giỏ hàng
export async function getCart(){
  const token = getToken();
  const res = await fetch(ENDPOINTS.cart.get,{
      headers:{
        ...getHeaders(),
        Authorization:`Bearer ${getToken()}`}
    }
  );
  return await res.json();
}

export async function addCart( productId,color,size,quantity){
 const res = await fetch(ENDPOINTS.cart.add,{
     method:"POST",
     headers:{
       ...getHeaders(),
       Authorization:
       `Bearer ${getToken()}`
     },
     body:JSON.stringify({ productId,color,size,quantity })
   }
 );
 return await res.json();
}

export async function removeCart(productId,size,color){
 const res=await fetch(ENDPOINTS.cart.remove,{
      method:"DELETE",
      headers:{
         ...getHeaders(),
         Authorization:
         `Bearer ${getToken()}`
      },
      body:JSON.stringify({productId,size,color})
   }
 );
 return await res.json();
}

export async function updateCart(productId,size,color,type){
 const res=await fetch(ENDPOINTS.cart.update,{
      method:"PUT",
      headers:{
         ...getHeaders(),
         Authorization:
         `Bearer ${getToken()}`
      },
      body:JSON.stringify({productId,size,color,type})
   }
 );
 return await res.json();
}

export async function clearCart(){

  const res = await fetch(ENDPOINTS.cart.clear,
    {
      method:"DELETE",
      headers:getHeaders(true)
    }
  );

  return await res.json();
}