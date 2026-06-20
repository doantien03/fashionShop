export async function requireAdmin() {
  const token = localStorage.getItem("token");

  if (!token) {
    location.replace("/login");
    return false;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/me", {
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