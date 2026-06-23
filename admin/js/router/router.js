import { isLogin } from "../utils/auth.js";
import { routes } from "./routes.js";
import { setActiveMenu } from "../utils/setActive.js";
import { requireAdmin } from "./guard.js";

export async function router() {
    let path = window.location.pathname;

    const app = document.getElementById("app");

    // normalize URL
    path = path.replace(/\/$/, "");
    if (path === "") path = "/";

    if (!isLogin()) {
        location.href = "/login";
        return;
    }

    const ok = await requireAdmin();
    if (!ok) return;

    app.style.display = "none";

    const page = routes[path];

    if (!page) {
        app.innerHTML = "<h2>404 Not Found</h2>";
        app.style.display = "block";
        return;
    }

    const init = page(app);

    app.style.display = "block";

    requestAnimationFrame(() => {
        if (typeof init === "function") init();
        setActiveMenu();
    });
}