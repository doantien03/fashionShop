export async function requireAdmin() {
  const token = localStorage.getItem("token");

  if (!token) {
    location.replace("/login");
    return false;
  }

  try {
    const res = await fetch("https://fashionshop-cjhc.onrender.com/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      localStorage.clear();
      location.replace("/login");
      return false;
    }

    const data = await res.json();
    
    const user = data.user || data;

    if (user.role !== "admin") {
      location.replace("/home");
      return false;
    }

    return true;

  } catch (err) {
    console.log(err);
    localStorage.clear();
    location.replace("/login");
    return false;
  }
}