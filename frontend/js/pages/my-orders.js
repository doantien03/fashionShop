import { getMyOrders } from "../services/order.js";

async function renderOrders(){

  const result = await getMyOrders();
  const container = document.getElementById("orders-list");
  const orders = result.orders || [];

  if(!orders.length){
    container.innerHTML = `
      <p>
        Bạn chưa có đơn hàng nào
      </p>
    `;

    return;
  }

  container.innerHTML =
    orders.map(order=>`

      <div class="order-card">

        <h3>
          Mã đơn:
          ${order._id}
        </h3>

        <p>
          Người nhận:
          ${order.customerName}
        </p>

        <p>
          SĐT:
          ${order.phone}
        </p>

        <p>
          Thanh toán:
          ${order.paymentMethod}
        </p>

        <p>
          Tổng tiền:
          ${order.totalPrice
            .toLocaleString("vi-VN")}đ
        </p>

      </div>

  `).join("");

}

export function initMyOrders(){

  renderOrders();

}