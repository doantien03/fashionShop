import { isLogin } from "../utils/auth.js";
import { routes } from "./routes.js";
import { setActiveMenu } from "../utils/setActive.js";
import { requireAdmin } from "./guard.js";

const FRONTEND_URL = "https://fashion-shopweb.netlify.app";
console.count("main.js loaded");

export async function router() {

    let path = window.location.pathname;
    const app = document.getElementById("app");

    // normalize URL 
    path = path.split("?")[0].replace(/\/$/, "");
    if (path === "") path = "/";

    // check login
    if (!isLogin()) {
        window.location.href = `${FRONTEND_URL}/login`;
        return;
    }

    // check admin quyền 
    const ok = await requireAdmin();
    if (!ok) return;

    // hide UI
    app.style.display = "none";

    // get page
    const page = routes[path];

    if (!page) {
        app.innerHTML = "<h2>404 Not Found</h2>";
        app.style.display = "block";
        return;
    }

    // render
    const init = page(app);
    app.style.display = "block";

    requestAnimationFrame(() => {
        if (typeof init === "function") {
            init();
        }
        setActiveMenu();
    });
}