export function requireAdmin(){

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  if(!token){
    location.href = "http://localhost:5500/login";
    return false;
  }

  if(user?.role !== "admin"){
    location.href = "http://localhost:5500/home";
    return false;
  }

  return true;
}