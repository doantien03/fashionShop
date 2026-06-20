import { getDashboard } from "../services/dashboard.js";

let revenueChart = null;

export function renderDashboard() {
  return `
    <div class="dashboard">

      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p> Chào mừng trở lại Admin 👋</p>
        </div>
      <div class="stats-grid">
        <div class="stat-card">

          <div class="stat-info">
            <h4>Đơn hàng</h4>
            <span id="total-orders"> ...</span>
          </div>

          <div class="stat-icon">📦</div>
        </div>

        <div class="stat-card">
          <div class="stat-info">
            <h4>Doanh thu</h4>
            <span id="total-revenue">...</span>
          </div>

          <div class="stat-icon">💰</div>
        </div>

        <div class="stat-card">
          <div class="stat-info">
            <h4>Sản phẩm</h4>
            <span id="total-products">...</span>
          </div>

          <div class="stat-icon">👕</div>
        </div>

        <div class="stat-card">
          <div class="stat-info">
            <h4>Người dùng</h4>
            <span id="total-users">...</span>
          </div>

          <div class="stat-icon">👥</div>
        </div>
      </div>

      <!-- trạng thái đon -->
      <div class="order-stats">

        <div class="mini-card">
          <h4>Chờ xử lý</h4>
          <span id="pending-orders">...</span>
        </div>

        <div class="mini-card">
          <h4>Đang giao</h4>
          <span id="shipping-orders">...</span>
        </div>

        <div class="mini-card">
          <h4>Hoàn thành</h4>
          <span id="completed-orders">...</span>
        </div>

        <div class="mini-card">
          <h4>Đã hủy</h4>
          <span id="cancelled-orders">...</span>
        </div>

      </div>

      <!-- doanh thu -->
      <div class="revenue-grid">

        <div class="revenue-card">
          <h4>Doanh thu hôm nay</h4>
          <span id="today-revenue">...</span>
        </div>

        <div class="revenue-card">
          <h4>Doanh thu tháng này</h4>
          <span id="month-revenue">...</span>
        </div>

      </div>

      <div class="dashboard-chart">
      <h2> Doanh thu 7 ngày gần nhất </h2>
      <canvas id="revenueChart"></canvas>
      </div>

      <!-- đơn hàng mới -->
      <div class="dashboard-section">
        <h2>Đơn hàng mới nhất</h2>
        <div id="latest-orders">
          <p>Đang tải...</p>
        </div>
      </div>
    </div>
  `;
}

export async function initDashboard() {

  try {
    const data = await getDashboard();
    if(!data.success){
      return;
    }

    document.getElementById("total-orders").innerText = data.totalOrders;
    document.getElementById("total-products").innerText = data.totalProducts;
    document.getElementById("total-users").innerText = data.totalUsers;
    document.getElementById("total-revenue").innerText = (data.revenue || 0).toLocaleString("vi-VN") + "đ";

    document.getElementById("pending-orders").innerText = data.pendingOrders;
    document.getElementById("shipping-orders").innerText = data.shippingOrders;
    document.getElementById("completed-orders").innerText = data.completedOrders;
    document.getElementById("cancelled-orders").innerText = data.cancelledOrders;

    document.getElementById("today-revenue").innerText = (data.todayRevenue || 0).toLocaleString("vi-VN")+"đ";
    document.getElementById("month-revenue").innerText = (data.monthRevenue || 0).toLocaleString("vi-VN")+"đ";

    renderLatestOrders(data.latestOrders || [] );
    renderRevenueChart(data.revenueChart || [] );
  }
  catch(error){
    console.log(error);
  }
}

// Badge trạng thái
function getStatusText(status){
    const map={
        pending:"Chờ xử lý",
        shipping:"Đang giao",
        completed:"Hoàn thành",
        cancelled:"Đã hủy"
    };
    return map[status]||status;
}

function renderLatestOrders(orders){
  const container = document.getElementById("latest-orders");
  if(!orders.length){
    container.innerHTML = "<p>Chưa có đơn hàng</p>";
    return;
  }
  container.innerHTML = ` <table class="dashboard-table">
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
            <td> ${order._id.slice(-8)} </td>
            <td> ${order.customerName} </td>
            <td> <span class="status ${order.status}"> ${getStatusText(order.status)}</span> </td>
            <td> ${(order.totalPrice || 0).toLocaleString("vi-VN")}đ </td>
          </tr>
        `).join("")}

      </tbody>
    </table>

  `;
}

function renderRevenueChart(data){
    const canvas = document.getElementById("revenueChart");
    if(!canvas){
        return;
    }

    if(revenueChart){
        revenueChart.destroy();
    }

    revenueChart = new Chart(canvas,{
        type:"line",
        data:{
            labels:data.map(item=>item._id),
            datasets:[{
                label:"Doanh thu (VNĐ)",
                data:data.map(item=>item.revenue),
                borderWidth:3,
                tension:0.35,
                fill:true
            }]
        },

        options:{
            responsive:true,
            maintainAspectRatio:false,
            plugins:{
                legend:{
                    display:false
                }
            },

            scales:{
                y:{
                    beginAtZero:true,
                    ticks:{
                        callback(value){
                            return value.toLocaleString("vi-VN")+"đ";
                        }
                    }
                }
            }
        }
    });
  }

