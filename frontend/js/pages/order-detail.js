import { getOrderById } from "../services/order.js";

export async function initOrderDetail(path){

  const orderId = path.split("/")[2];

  const data = await getOrderById(orderId);

  const order = data.order;

  const container = document.getElementById("order-detail-content");

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
        <strong>SĐT:</strong>
        ${order.phone}
      </p>

      <p>
        <strong>Địa chỉ:</strong>
        ${order.address}
      </p>

      <p>
        <strong>Trạng thái:</strong>
        ${order.status}
      </p>

    </div>

    <h3>Sản phẩm</h3>

    <div class="order-products">

      ${order.items.map(item=>`

        <div class="order-product">

          <img src="${item.image}" />

          <div>

            <h4>${item.name}</h4>

            <p>Size: ${item.size}</p>

            <p>Màu: ${item.color}</p>

            <p>SL: ${item.quantity}</p>

            <p>
              ${item.price.toLocaleString("vi-VN")}đ
            </p>

          </div>

        </div>

      `).join("")}

    </div>

  `;

  bindCancel(order);
}