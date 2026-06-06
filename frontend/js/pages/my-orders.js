import { getMyOrders } from "../services/order.js";

async function renderOrders(){

  const data = await getMyOrders();

  const orders = data.orders || [];

  const container =
    document.getElementById("orders-list");

  if(!orders.length){

    container.innerHTML = `
      <div class="empty-orders">
        Bạn chưa có đơn hàng nào
      </div>
    `;

    return;
  }

  container.innerHTML = orders.map(order=>`

    <div class="order-card">

      <div class="order-top">

        <h3>
          #${order._id.slice(-8).toUpperCase()}
        </h3>

        <span class="status ${order.status}">
          ${order.status}
        </span>

      </div>

      <p>
        Ngày đặt:
        ${new Date(order.createdAt)
          .toLocaleDateString("vi-VN")}
      </p>

      <p>
        Tổng tiền:
        ${order.totalPrice.toLocaleString("vi-VN")}đ
      </p>

      <button
        class="view-order-btn"
        data-id="${order._id}"
      >
        Xem chi tiết
      </button>

    </div>

  `).join("");

  bindEvents();
}

function bindEvents(){

  document
    .querySelectorAll(".view-order-btn")
    .forEach(btn=>{

      btn.onclick=()=>{

        const id = btn.dataset.id;

        history.pushState(
          {},
          "",
          `/my-orders/${id}`
        );

        window.renderRoute(
          `/my-orders/${id}`
        );

      };

    });

}

export async function initMyOrders(){

  await renderOrders();

}