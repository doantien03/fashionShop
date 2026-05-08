// lấy cart từ localStorage
export function getCart() {

  return JSON.parse(
    localStorage.getItem("cart")
  ) || [];
}


// lưu cart vào localStorage
export function saveCart(cart) {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
}

// thêm sản phẩm vào cart
export function addToCart(product) {

  const cart = getCart();

  // kiểm tra sản phẩm đã tồn tại chưa
  const existing = cart.find(item =>

    item._id === product._id &&
    item.size === product.size &&
    item.color === product.color

  );

  // nếu đã có -> tăng quantity
  if (existing) {

    existing.quantity += product.quantity;

  }

  // chưa có -> thêm mới
  else {

    cart.push(product);

  }

  saveCart(cart);
}

// render giỏ hàng
export function renderCart() {

  const cart = getCart();

  const cartItems =
    document.getElementById("cartItems");

  const cartTotal =
    document.getElementById("cartTotal");


  // trả về item trong giỏ hàng
  cartItems.innerHTML = cart.map(item => `

    <div class="cart-item">

      <img src="${item.image}" />

      <div class="cart-info">

        <h4>${item.name}</h4>

        <p>Màu: ${item.color}</p>

        <p>Size: ${item.size}</p>

        <p>
          ${item.price.toLocaleString("vi-VN")}đ
          × ${item.quantity}
        </p>

      </div>

    </div>

  `).join("");


  // tính tổng tiền
  const total = cart.reduce((sum, item) => {

    return sum + item.price * item.quantity;

  }, 0);


  // render tổng tiền
  cartTotal.innerText =

    total.toLocaleString("vi-VN") + "đ";
}




// CART SIDEBAR
// mở sidebar cart
export function openCart() {

  document.getElementById("cartSidebar")
    .classList.add("active");

  document.body.classList.add("no-scroll");
}


// đóng sidebar cart
export function closeCart() {

  document.getElementById("cartSidebar")
    .classList.remove("active");

  document.body.classList.remove("no-scroll");
}


// khởi tạo event cart
export function initCart() {

  document.getElementById("closeCart")
    .onclick = closeCart;

  document.getElementById("cartOverlay")
    .onclick = closeCart;
}