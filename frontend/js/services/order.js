import { ENDPOINTS,getHeaders} from "../config/apiConfig.js";

// CREATE
export async function createOrder(data){
  const response = await fetch(ENDPOINTS.orders.create,
    {
      method:"POST",
      headers:
      getHeaders(),

      body:
      JSON.stringify(data)
    }
  );
  return response.json();
}

// GET ALL
export async function getOrders(){
  const response = await fetch(ENDPOINTS.orders.getAll,
    {
      headers:
      getHeaders(true)
    }
  );
  return response.json();
}

// GET BY ID
export async function getOrderById(id){
  const response = await fetch(ENDPOINTS.orders.getById(id),
    {
      headers:
      getHeaders(true)
    }
  );
  return response.json();
}

// UPDATE STATUS
export async function orderStatus(id,status){
  const response =await fetch(ENDPOINTS.orders.updateStatus(id),
    {
      method:"PUT",
      headers:
      getHeaders(true),

      body:
      JSON.stringify({
        status
      })
    }
  );
  return response.json();
}

// DELETE
export async function deleteOrder(id){
  const response =await fetch(ENDPOINTS.orders.delete(id),
    {
      method:"DELETE",
      headers:
      getHeaders(true)
    }
  );
  return response.json();
}