import { getCart,removeCartItem,updateCart,updateCount} from "../modules/cart.js";

function CartPage() {
  const cart = getCart();

  const cartList = document.querySelector(".page-items");

  const cartTotal = document.querySelector(".page-total");
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
        <p>Giá: ${item.price.toLocaleString("vi-VN")}đ </p>

        <div class="quantity-box">
          <button
             class="qty-btn decrease-btn"
             data-id="${item._id}"
             data-size="${item.size}"
             data-color="${item.color}"> - </button>
          <span class="qty-value"> ${item.quantity} </span>

          <button
             class="qty-btn increase-btn"
             data-id="${item._id}"
             data-size="${item.size}"
             data-color="${item.color}"> + </button>
        </div>

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
    return sum + ( item.price * item.quantity );
    }, 0);

  cartTotal.innerText = total.toLocaleString("vi-VN") + "đ";

  // remove
  document.querySelectorAll(".remove-btn")
    .forEach(button => {

      button.onclick = () => {
        removeCartItem(
          button.dataset.id,
          button.dataset.size,
          button.dataset.color
        );
        CartPage();
        updateCount();
      };
  });
  // increase
  document.querySelectorAll(".increase-btn")
    .forEach(button => {

      button.onclick = () => {
        updateCart(
          button.dataset.id,
          button.dataset.size,
          button.dataset.color,
          "increase"
        );
        CartPage();
        updateCount();
      };
   });

  // decrease
  document.querySelectorAll(".decrease-btn")
    .forEach(button => {

      button.onclick = () => {
        updateCart(
          button.dataset.id,
          button.dataset.size,
          button.dataset.color,
          "decrease"
        );
        CartPage();
        updateCount();
      };
  });
}

export function initCartPage() {
  CartPage();
  updateCount();
}
