import { ENDPOINTS, getHeaders } from "../config/apiConfig.js";

// Lấy danh sách users
export async function getUsers() {
  try {
    const res = await fetch(ENDPOINTS.users, {
      method: "GET",
      headers: getHeaders(true),
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch users",
        users: [],
      };
    }

    return await res.json();
  } catch (error) {
    console.error("getUsers error:", error);

    return {
      success: false,
      message: "Server error",
      users: [],
    };
  }
}

// Lấy user theo ID
export async function getUserById(id) {
  try {
    const res = await fetch(`${ENDPOINTS.users}/${id}`, {
      method: "GET",
      headers: getHeaders(true),
    });

    if (!res.ok) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return await res.json();
  } catch (error) {
    console.error("getUserById error:", error);

    return {
      success: false,
      message: "Server error",
    };
  }
}

// Xoá user
export async function deleteUser(id) {
  try {
    const res = await fetch(`${ENDPOINTS.users}/${id}`, {
      method: "DELETE",
      headers: getHeaders(true),
    });

    return await res.json();
  } catch (error) {
    console.error("deleteUser error:", error);

    return {
      success: false,
      message: "Server error",
    };
  }
}

// Cập nhật user (role, status,...)
export async function updateUser(id, data) {
  try {
    const res = await fetch(`${ENDPOINTS.users}/${id}`, {
      method: "PUT",
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error) {
    console.error("updateUser error:", error);

    return {
      success: false,
      message: "Server error",
    };
  }
}