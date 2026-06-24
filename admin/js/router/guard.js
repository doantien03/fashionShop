const ADMIN_URL = "https://fashion-admin-web.netlify.app";
const API_URL = "https://fashionshop-cjhc.onrender.com/api/auth/me";

export async function requireAdmin() {
  const token = localStorage.getItem("token");

  // Không có token → về login admin
  if (!token) {
    redirectToLogin();
    return false;
  }

  try {
    const res = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // token sai / hết hạn
    if (!res.ok) {
      clearAuth();
      redirectToLogin();
      return false;
    }

    const data = await res.json();
    const user = data?.user ?? data;

    // Không phải admin
    if (!user || user.role !== "admin") {
      clearAuth();
      redirectToLogin();
      return false;
    }

    //  OK
    return true;

  } catch (err) {
    console.error("requireAdmin error:", err);

    clearAuth();
    redirectToLogin();
    return false;
  }
}

/** Xóa auth */
function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

/** Redirect về login admin*/
function redirectToLogin() {
  window.location.href = `${ADMIN_URL}/login`;
}