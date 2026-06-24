import { routes } from "./routes.js";
import { setActiveMenu } from "../utils/setActive.js";
import { requireAdmin } from "./guard.js";

let isRendering = false;

export async function router() {
    if (isRendering) return;
    isRendering = true;

    try {
        let path = window.location.pathname;
        const app = document.getElementById("app");

        path = path.split("?")[0].replace(/\/$/, "");
        if (path === "") path = "/dashboard";

        const ok = await requireAdmin();
        if (!ok) return;

        app.innerHTML = "";
        app.style.display = "none";

        const page = routes[path];

        if (!page) {
            app.innerHTML = "<h2>404 Not Found</h2>";
            app.style.display = "block";
            return;
        }

        const init = await page(app);
        app.style.display = "block";

        requestAnimationFrame(() => {
            if (typeof init === "function") init();
            setActiveMenu();
        });

    } catch (err) {
        console.error("router error:", err);
    } finally {
        isRendering = false;
    }
}

window.addEventListener("popstate", router);
router();