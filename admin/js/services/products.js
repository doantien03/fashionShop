import { ENDPOINTS, getHeaders } from "../config/apiConfig.js";

// lấy tất cả sản phẩm
export async function getProducts() {
  try {
    const res = await fetch(ENDPOINTS.products.getALL, {
      headers: getHeaders()
    });

    return await res.json();
  } catch (err) {
    console.error("getProducts error:", err);
    return { products: [] };
  }
}

// tạo sản phẩm mới
export async function createProduct(product){
  const res = await fetch(ENDPOINTS.products.create,
      {
        method:"POST",
        headers:getHeaders(true),
        body:JSON.stringify(product)
      }
    );
  return res.json();
}

// chi tiết sản phẩm
export async function getProductById(id){
  const res = await fetch(ENDPOINTS.products.getById(id));
  return res.json();
}

// sửa sản phẩm
export async function updateProduct(id,product){
  const res = await fetch(ENDPOINTS.products.update(id),
      {
        method:"PUT",
        headers:getHeaders(true),
        body:JSON.stringify(product)
      }
    );
  return res.json();
}

// xóa sản phẩm
export async function deleteProduct(id){
  const res = await fetch(ENDPOINTS.products.delete(id),
      {
        method:"DELETE",
        headers:getHeaders(true)
      }
    );
  return res.json();
}


