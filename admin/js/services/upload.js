import { ENDPOINTS } from "../config/apiConfig.js";

export async function uploadImage(file, category, type, name) {
  const formData = new FormData();

  formData.append("image", file);
  formData.append("category", category);
  formData.append("type", type);
  formData.append("name", name);

  const response = await fetch(ENDPOINTS.upload.image, {
    method: "POST",
    body: formData
  });

  return response.json();
}