import { renderDashboard,initDashboard } from "../pages/dashboard.js";
import { renderOrders,initOrders } from "../pages/orders.js";
import { renderProducts,initProducts } from "../pages/products.js";
import { renderUsers,initUsers } from "../pages/users.js";

export const routes = {
  "/admin": (app) => {
    app.innerHTML = renderDashboard();
    return initDashboard;
  },

  "/admin/dashboard": (app) => {
    app.innerHTML = renderDashboard();
    return initDashboard;
  },

  "/admin/orders": (app) => {
    app.innerHTML = renderOrders();
    return initOrders;
  },

  "/admin/product": (app) => {
    app.innerHTML = renderProducts();
    return initProducts;
  },

  "/admin/users": (app) => {
    app.innerHTML = renderUsers();
    return initUsers;
  }
};