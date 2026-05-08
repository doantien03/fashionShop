import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { initRouter } from "./router.js";
import { initModal } from "./modules/modal.js";
import { initCart, renderCart , openCart } from "./utils/cart.js";


renderHeader();

renderFooter();

initRouter();

initCart();

renderCart();

openCart();
