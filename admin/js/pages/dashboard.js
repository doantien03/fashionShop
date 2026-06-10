import { getDashboardStats }
from "../services/dashboard.js";

export function renderDashboard() {

  return `

    <div class="dashboard">

      <div class="dashboard-header">

        <h1>Dashboard</h1>

        <p>
          Chào mừng trở lại Admin 👋
        </p>

      </div>

      <div class="stats-grid">

        <div class="stat-card">

          <div class="stat-info">

            <h4>Đơn hàng</h4>

            <span id="total-orders">
              ...
            </span>

          </div>

          <div class="stat-icon">
            📦
          </div>

        </div>

        <div class="stat-card">

          <div class="stat-info">

            <h4>Doanh thu</h4>

            <span id="total-revenue">
              ...
            </span>

          </div>

          <div class="stat-icon">
            💰
          </div>

        </div>

        <div class="stat-card">

          <div class="stat-info">

            <h4>Sản phẩm</h4>

            <span id="total-products">
              ...
            </span>

          </div>

          <div class="stat-icon">
            👕
          </div>

        </div>

        <div class="stat-card">

          <div class="stat-info">

            <h4>Người dùng</h4>

            <span id="total-users">
              ...
            </span>

          </div>

          <div class="stat-icon">
            👥
          </div>

        </div>

      </div>

      <div class="dashboard-section">

        <h2>
          Đơn hàng mới nhất
        </h2>

        <div id="latest-orders">

          <p>
            Đang tải...
          </p>

        </div>

      </div>

    </div>

  `;
}

export async function initDashboard() {

  try {

    const data =
      await getDashboardStats();

    if(!data.success){
      return;
    }

    document.getElementById(
      "total-orders"
    ).innerText =
      data.totalOrders;

    document.getElementById(
      "total-products"
    ).innerText =
      data.totalProducts;

    document.getElementById(
      "total-users"
    ).innerText =
      data.totalUsers;

    document.getElementById(
      "total-revenue"
    ).innerText =
      (data.revenue || 0)
      .toLocaleString("vi-VN")
      + "đ";

    renderLatestOrders(
      data.latestOrders || []
    );

  }
  catch(error){

    console.log(error);

  }

}

function renderLatestOrders(
  orders
){

  const container =
    document.getElementById(
      "latest-orders"
    );

  if(!orders.length){

    container.innerHTML =
      "<p>Chưa có đơn hàng</p>";

    return;
  }

  container.innerHTML = `

    <table class="dashboard-table">

      <thead>

        <tr>

          <th>Mã đơn</th>

          <th>Khách hàng</th>

          <th>Trạng thái</th>

          <th>Tổng tiền</th>

        </tr>

      </thead>

      <tbody>

        ${orders.map(order=>`

          <tr>

            <td>
              ${order._id.slice(-6)}
            </td>

            <td>
              ${order.customerName}
            </td>

            <td>
              ${order.status}
            </td>

            <td>
              ${(order.totalPrice || 0)
                .toLocaleString("vi-VN")}đ
            </td>

          </tr>

        `).join("")}

      </tbody>

    </table>

  `;
}