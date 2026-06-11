import { ENDPOINTS } from "../config/apiConfig.js";

export async function uploadImage(file,category){
  const formData = new FormData();
  formData.append("image",file);

  formData.append("category",category);
  const response = await fetch(ENDPOINTS.upload.image,
      {
        method:"POST",
        body:formData
      }
    );
  return response.json();
}