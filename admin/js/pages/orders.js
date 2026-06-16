import { getOrders,orderStatus,deleteOrder,getOrderById } from "../services/orders.js";

let isBound = false;
export function renderOrders() {
  return `
    <main class="admin-orders">
      <div class="page-header">
        <h1>Quản lý đơn hàng</h1>
      </div>

      <div id="orders-container">Đang tải...</div>
    </main>

    <!-- modal xem sản phẩm -->
    <div id="order-modal" class="order-modal hidden">
      <div class="order-modal-content">
        <span id="close-modal" class="close-btn">&times;</span>
        <div id="order-detail"></div>
      </div>
    </div>
  `;
}

export async function initOrders() {
  const container = document.getElementById("orders-container");
  if (!container) return;
  const data = await getOrders();

  if (!data?.success) {
    container.innerHTML = "<p>Lỗi tải đơn hàng</p>";
    return;
  }

  const orders = data.orders || [];
  if (!orders.length) {
    container.innerHTML = "<p>Chưa có đơn hàng</p>";
    return;
  }

  container.innerHTML = `
    <table class="orders-table">
      <thead>
        <tr>
          <th>Mã đơn</th>
          <th>Khách hàng</th>
          <th>SĐT</th>
          <th>Tổng tiền</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>

      <tbody>
        ${orders.map(order => `
          <tr>
            <td>${order._id}</td>
            <td>${order.customerName || ""}</td>
            <td>${order.phone || ""}</td>
            <td>${order.totalPrice?.toLocaleString("vi-VN")}đ</td>
            <td>
              ${getStatusUI(order)}
            </td>

            <td>
              <button class="view-btn" data-id="${order._id}">Xem</button>
              <button class="delete-btn" data-id="${order._id}">Xóa</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
  bindEvents();
}

function getStatusUI(order) {
  switch (order.status) {

    case "pending":
      return `
        <div class="status-box">
          <span class="order-status status-pending">
            Chờ xử lý
          </span>

          <div class="status-actions">
            <button
              class="status-btn confirm-btn"
              data-id="${order._id}"
              data-status="confirmed">
              Xác nhận
            </button>

            <button
              class="status-btn cancel-btn"
              data-id="${order._id}"
              data-status="cancelled">
              Hủy
            </button>
          </div>
      `;

    case "confirmed":
      return `
        <div class="status-box">
          <span class="order-status status-confirmed">
            Đã xác nhận
          </span>

          <div class="status-actions">
            <button
              class="status-btn shipping-btn"
              data-id="${order._id}"
              data-status="shipping">
              Giao hàng
            </button>

            <button
              class="status-btn cancel-btn"
              data-id="${order._id}"
              data-status="cancelled">
              Hủy
            </button>
          </div>
      `;

    case "shipping":
      return `
        <div class="status-box">
          <span class="order-status status-shipping">
            Đang giao
          </span>

          <div class="status-actions">
            <button
              class="status-btn completed-btn"
              data-id="${order._id}"
              data-status="completed">
              Hoàn thành
            </button>
          </div>
      `;

    case "completed":
      return `
        <span class="order-status status-completed">
          Hoàn thành
        </span>
      `;

    case "cancelled":
      return `
        <span class="order-status status-cancelled">
          Đã hủy
        </span>
      `;
    default:
      return "";
  }
}

function bindEvents() {
  if (isBound) return;
  isBound = true;

  /* thay đổi trạng thái */
  document.addEventListener("click", async e => {
  const btn = e.target.closest(".status-btn");
  if (!btn) return;

  const id = btn.dataset.id;
  const status = btn.dataset.status;

  btn.disabled = true;
  btn.innerText = "Đang xử lý...";
  const res = await orderStatus(id, status);

  if (!res.success) {
    alert(res.message);
    await initOrders();
    return;
  }
  await initOrders();
  });

  /* xóa đơn hàng */
  document.addEventListener("click", async e => {
    const btn = e.target.closest(".delete-btn");
    if (!btn) return;
    const id = btn.dataset.id;

    if (!confirm("Bạn chắc chắn muốn xóa?")) 
      return;

    const res = await deleteOrder(id);
    if (res?.success) {
      await initOrders();
    } else {
      alert(res.message || "Xóa thất bại");
    }
  });

  /* xem chi tiết đơn */
  document.addEventListener("click", async e => {
    const btn = e.target.closest(".view-btn");
    if (!btn) return;
    openOrderDetail(btn.dataset.id);
  });

  /* đóng modal */
  document.addEventListener("click", e => {
    if (e.target.id === "close-modal") {
      document.getElementById("order-modal").classList.add("hidden");
    }
  });
}

/* chi tiết đơn hàng  */
async function openOrderDetail(id) {
  const modal = document.getElementById("order-modal");
  const detail = document.getElementById("order-detail");

  modal.classList.remove("hidden");
  detail.innerHTML = "Đang tải...";

  const res = await getOrderById(id);
  if (!res?.success) {
    detail.innerHTML = "<p>Lỗi tải chi tiết</p>";
    return;
  }

  const order = res.order;

  detail.innerHTML = `
    <h2>Chi tiết đơn hàng</h2>
    <p><b>Mã:</b> ${order._id}</p>
    <p><b>Khách:</b> ${order.customerName || ""}</p>
    <p><b>SĐT:</b> ${order.phone || ""}</p>
    <p><b>Tổng:</b> ${order.totalPrice?.toLocaleString("vi-VN")}đ</p>
    <p><b>Trạng thái:</b> ${order.status}</p>
    <hr/>
    <h3>Sản phẩm</h3>
    <ul>
      ${order.items?.map(item => `
        <li>
          ${item.name} - SL: ${item.quantity} - Giá:${item.price}
        </li>
      `).join("")}
    </ul>
  `;
}