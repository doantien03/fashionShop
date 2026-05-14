import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { initRouter } from "./router/router.js";
import { initModal } from "./modules/modal.js";
import { initCart, renderCart} from "./modules/cart.js";


renderHeader();

renderFooter();

initRouter();

initModal();

initCart();

renderCart();

