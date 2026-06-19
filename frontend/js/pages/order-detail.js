import { getOrderById,cancelOrder} from "../services/order.js";
import { showToast } from "../utils/toast.js";

export async function initOrderDetail(path){
  try{
    const orderId = path.split("/")[2];
    const data = await getOrderById(orderId);

    if(!data.success){
      showToast(
        "Không tìm thấy đơn hàng",
        "error"
      );
      return;
    }

    const order = data.order;

    const container = document.getElementById(
      "order-detail-content"
    );

    container.innerHTML = `

      <div class="order-info">

        <p>
          <strong>Mã đơn:</strong>
          ${order._id}
        </p>

        <p>
          <strong>Khách hàng:</strong>
          ${order.customerName}
        </p>

        <p>
          <strong>Số điện thoại:</strong>
          ${order.phone}
        </p>

        <p>
          <strong>Địa chỉ:</strong>
          ${order.address}
        </p>

        <p>
          <strong>Trạng thái:</strong>

          <span class="order-status ${order.status}">
            ${order.status}
          </span>

        </p>

      </div>

      <h2 class="order-products-title">
        Sản phẩm đã đặt
      </h2>

      <div class="order-products">

        ${order.items.map(item => `

          <div class="order-product">

            <img src="${item.image}" />

            <div class="order-product-content">

              <h4>${item.name}</h4>

              <p>Màu: ${item.color}</p>

              <p>Size: ${item.size}</p>

              <p>Số lượng: ${item.quantity}</p>

              <div class="order-price">
                ${item.price.toLocaleString("vi-VN")}đ
              </div>

            </div>

          </div>

        `).join("")}

      </div>

      <div class="order-total">

        <h2>
          Tổng tiền:
          ${order.totalPrice.toLocaleString("vi-VN")}đ
        </h2>

      </div>

      <div class="order-actions">

        <button
          id="back-orders-btn"
          class="order-btn order-btn-back"
        >
          Quay lại đơn hàng
        </button>

        ${
          order.status === "pending"
          ?
          `
          <button
            id="cancel-order-btn"
            class="order-btn order-btn-cancel"
          >
            Hủy đơn hàng
          </button>
          `
          :
          ""
        }

      </div>

    `;

    bindBack();

    bindCancel(order);

  }
  catch(error){

    console.log(error);

    showToast(
      "Lỗi tải đơn hàng",
      "error"
    );

  }

}

function bindBack(){

  const btn = document.getElementById(
    "back-orders-btn"
  );

  if(!btn) return;

  btn.onclick = ()=>{

    history.pushState(
      {},
      "",
      "/my-orders"
    );

    window.renderRoute(
      "/my-orders"
    );

  };

}

async function bindCancel(order){

  const btn = document.getElementById(
    "cancel-order-btn"
  );

  if(!btn) return;

  btn.onclick = async()=>{

    const confirmCancel = confirm(
      "Bạn có chắc muốn hủy đơn hàng này?"
    );

    if(!confirmCancel) return;

    try{

      const result = await cancelOrder(
        order._id
      );

      if(result.success){

        showToast(
          "Hủy đơn hàng thành công",
          "success"
        );

        setTimeout(()=>{
          location.reload();
        },1000);

      }
      else{

        showToast(
          result.message ||
          "Không thể hủy đơn hàng",
          "error"
        );

      }

    }
    catch(error){

      console.log(error);

      showToast(
        "Lỗi server",
        "error"
      );

    }

  };

}