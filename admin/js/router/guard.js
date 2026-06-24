const FRONTEND_URL = "https://fashion-shopweb.netlify.app";

let cachedUser = null;

export async function requireAdmin() {
  const token = localStorage.getItem("token");

  // không có token → về login frontend
  if (!token) {
    window.location.href = `${FRONTEND_URL}/login`;
    return false;
  }

  try {
    const res = await fetch("https://fashionshop-cjhc.onrender.com/api/auth/me",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // Token sai / hết hạn
    if (!res.ok) {
      localStorage.clear();
      window.location.href = `${FRONTEND_URL}/login`;
      return false;
    }

    const data = await res.json();
    const user = data.user || data;

    // Không phải admin
    if (user.role !== "admin") {
      localStorage.clear();
      window.location.href = FRONTEND_URL;
      return false;
    }

    // OK cho vào admin
    return true;

  } catch (err) {
    console.error("requireAdmin error:", err);

    localStorage.clear();
    window.location.href = `${FRONTEND_URL}/login`;
    return false;
  }
}