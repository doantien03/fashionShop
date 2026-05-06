import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { initRouter } from "./router.js";
import { initModal } from "./modules/modal.js";

renderHeader();

renderFooter();

initRouter();

initModal();

