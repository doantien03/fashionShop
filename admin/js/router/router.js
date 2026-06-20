import { isLogin } from "../utils/auth.js";
import { routes } from "./routes.js";
import { setActiveMenu } from "../utils/setActive.js";
import { requireAdmin } from "./guard.js";

export async function router() {

    const path = window.location.pathname;
    const app = document.getElementById("app");

    // Ẩn giao diện trước
    app.style.display = "none";
    if (!isLogin()) {
        location.href="/login";
        return;
    }

    // Chỉ kiểm tra quyền nếu đang ở admin
    if(path.startsWith("/admin")){
        const ok = await requireAdmin();
        if(!ok){
            return;
        }
    }

    const page = routes[path];

    if(!page){

        app.innerHTML="<h2>404 Not Found</h2>";
        app.style.display="block";
        return;
    }

    const init = page(app);
    app.style.display="block";
    requestAnimationFrame(()=>{

        if(typeof init==="function"){
            init();
        }
        setActiveMenu();
    });
}