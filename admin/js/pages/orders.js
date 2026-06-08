import { getOrders, orderStatus, deleteOrder, getOrderById } from "../services/orders.js";

/* =========================
   RENDER PAGE
========================= */
export function renderOrders() {
  return `
    <main class="admin-orders">
      <div class="page-header">
        <h1>Quản lý đơn hàng</h1>
      </div>

      <div id="orders-container">Đang tải...</div>
    </main>

    <!-- MODAL DETAIL -->
    <div id="order-modal" class="order-modal hidden">
      <div class="order-modal-content">
        <span id="close-modal" class="close-btn">&times;</span>
        <div id="order-detail"></div>
      </div>
    </div>
  `;
}

/* =========================
   INIT LOGIC
========================= */
export async function initOrders() {
  const container = document.getElementById("orders-container");

  if (!container) return;

  const data = await getOrders();
  if (!data || !data.success) {
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
              <select class="status-select" data-id="${order._id}">
                <option value="pending" ${order.status === "pending" ? "selected" : ""}>Chờ xử lý</option>
                <option value="shipping" ${order.status === "shipping" ? "selected" : ""}>Đang giao</option>
                <option value="completed" ${order.status === "completed" ? "selected" : ""}>Hoàn thành</option>
                <option value="cancelled" ${order.status === "cancelled" ? "selected" : ""}>Đã hủy</option>
              </select>
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

/* =========================
   EVENTS
========================= */
function bindEvents() {

  /* STATUS CHANGE */
  document.querySelectorAll(".status-select").forEach(select => {
    select.addEventListener("change", async () => {
      const id = select.dataset.id;
      const status = select.value;

      const res = await orderStatus(id, status);

      if (res.success) {
        alert("Cập nhật trạng thái thành công");
      } else {
        alert(res.message);
      }
    });
  });

  /* DELETE ORDER */
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;

      if (!confirm("Bạn chắc chắn muốn xóa?")) return;

      const res = await deleteOrder(id);

      if (res.success) {
        await initOrders();
      } else {
        alert(res.message);
      }
    });
  });

  /* VIEW DETAIL */
  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      openOrderDetail(id);
    });
  });

  /* CLOSE MODAL */
  const closeBtn = document.getElementById("close-modal");
  if (closeBtn) {
    closeBtn.onclick = () => {
      document.getElementById("order-modal").classList.add("hidden");
    };
  }
}

/* =========================
   ORDER DETAIL MODAL
========================= */
async function openOrderDetail(id) {
  const modal = document.getElementById("order-modal");
  const detail = document.getElementById("order-detail");

  modal.classList.remove("hidden");
  detail.innerHTML = "Đang tải...";

  const res = await getOrderById(id);

  if (!res.success) {
    detail.innerHTML = "<p>Lỗi tải chi tiết</p>";
    return;
  }

  const order = res.order;

  detail.innerHTML = `
    <h2>Chi tiết đơn hàng</h2>

    <p><b>Mã:</b> ${order._id}</p>
    <p><b>Khách:</b> ${order.customerName}</p>
    <p><b>SĐT:</b> ${order.phone}</p>
    <p><b>Tổng:</b> ${order.totalPrice?.toLocaleString("vi-VN")}đ</p>
    <p><b>Trạng thái:</b> ${order.status}</p>

    <hr/>

    <h3>Sản phẩm</h3>

    <ul>
      ${order.items?.map(item => `
        <li>
          ${item.name} - SL: ${item.quantity} - ${item.price}
        </li>
      `).join("")}
    </ul>
  `;
}