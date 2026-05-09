import {  getCart, removeCartItem } from "../modules/cart.js";

export function renderCartPage() {
  const cart = getCart();

  const cartList =
    document.getElementById("cart-list");

  const cartTotal =
    document.getElementById("cart-total");

  // cart rỗng
  if (cart.length === 0) {

    cartList.innerHTML = `
      <p>Giỏ hàng đang trống</p>
    `;
    cartTotal.innerText = "0đ";
    return;
  }

  // render cart items
  cartList.innerHTML = cart.map(item => `

    <div class="cart-item">
      <img src="${item.image}" />
      <div class="cart-info">
        <h3>${item.name}</h3>
        <p>Màu: ${item.color}</p>
        <p>Size: ${item.size}</p>
        <p>
          ${item.price.toLocaleString("vi-VN")}đ
        </p>

        <p>
          SL: ${item.quantity}
        </p>

        <button
          class="remove-btn"
          data-id="${item._id}"
          data-size="${item.size}"
          data-color="${item.color}">
          Xóa
        </button>

      </div>

    </div>

  `).join("");



  // tổng tiền
  const total = cart.reduce((sum, item) => {
    return sum + ( item.price * item.quantit );
    }, 0);

  cartTotal.innerText =
    total.toLocaleString("vi-VN") + "đ";

  // remove
  document.querySelectorAll(".remove-btn")
    .forEach(button => {

      button.onclick = () => {

        removeCartItem(
          button.dataset.id,
          button.dataset.size,
          button.dataset.color
        );
        renderCartPage();
      };
  });
}