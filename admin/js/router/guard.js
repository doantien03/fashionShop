const FRONTEND_URL = "https://fashion-shop-web.netlify.app";


export async function requireAdmin() {
  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  if (!token) {
    console.log("NO TOKEN");
    window.location.href = `${FRONTEND_URL}/login`;
    return false;
  }

  try {
    const res = await fetch(
      "https://fashionshop-cjhc.onrender.com/api/auth/me",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("STATUS:", res.status);

    if (!res.ok) {
      console.log("FETCH FAILED");
      localStorage.clear();
      window.location.href = `${FRONTEND_URL}/login`;
      return false;
    }

    const data = await res.json();
    console.log("DATA:", data);

    const user = data.user || data;
    console.log("ROLE:", user.role);

    if (user.role !== "admin") {
      console.log("NOT ADMIN");
      localStorage.clear();
      window.location.href = FRONTEND_URL;
      return false;
    }

    console.log("requireAdmin SUCCESS");
    return true;

  } catch (err) {
    console.error("requireAdmin ERROR:", err);

    localStorage.clear();
    window.location.href = `${FRONTEND_URL}/login`;
    return false;
  }
}