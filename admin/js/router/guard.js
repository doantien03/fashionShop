const FRONTEND_URL = "https://your-frontend.netlify.app";

// cache user trong session
let cachedUser = null;
let isFetching = false;

export async function requireAdmin() {
  const token = localStorage.getItem("token");

  // ❌ không có token
  if (!token) {
    window.location.href = `${FRONTEND_URL}/login`;
    return false;
  }

  // ✅ nếu đã có cache → không gọi API nữa
  if (cachedUser) {
    return cachedUser.role === "admin";
  }

  // 🔥 chặn spam request song song
  if (isFetching) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (!isFetching) {
          clearInterval(interval);
          resolve(cachedUser?.role === "admin");
        }
      }, 50);
    });
  }

  isFetching = true;

  try {
    const res = await fetch(
      "https://fashionshop-cjhc.onrender.com/api/auth/me",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!res.ok) {
      cachedUser = null;
      localStorage.clear();
      window.location.href = `${FRONTEND_URL}/login`;
      return false;
    }

    const data = await res.json();
    const user = data.user || data;

    cachedUser = user;

    if (user.role !== "admin") {
      cachedUser = null;
      localStorage.clear();
      window.location.href = FRONTEND_URL;
      return false;
    }

    return true;

  } catch (err) {
    console.error("requireAdmin error:", err);

    cachedUser = null;
    localStorage.clear();
    window.location.href = `${FRONTEND_URL}/login`;
    return false;

  } finally {
    isFetching = false;
  }
}