// lấy cart từ localStorage
function getCart() {
  return JSON.parse(
    localStorage.getItem("cart")
  ) || [];
}

// lưu cart vào localStorage
function saveCart(cart) {
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
}

// thêm sản phẩm vào cart
function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item =>

    item._id === product._id &&
    item.size === product.size &&
    item.color === product.color
  );
  // sản phẩm tồn tại thì +1 ở SL
  if (existing) {

    existing.quantity += product.quantity;

  }
  // chưa có thì thêm mới
  else {
    cart.push(product);
  }
  saveCart(cart);
}

// xóa sản phẩm khỏi giỏ hàng
function removeCartItem(id,size,color) {
  let cart = getCart();
  cart = cart.filter(item => {

    return !(
      item._id === id &&
      item.size === size &&
      item.color === color
    );

  });
  saveCart(cart);
  renderCart();
}

// render giỏ hàng
function renderCart() {
  const cart = getCart();
  const cartItems =
    document.getElementById("cartItems");

  const cartTotal =
    document.getElementById("cartTotal");


  // trả về item trong giỏ hàng
  cartItems.innerHTML = cart.map(item => `

    <div class="cart-item"><img src="${item.image}" />
       <div class="cart-info">
        <h4>${item.name}</h4>
        <p>Màu: ${item.color}</p>
        <p>Size: ${item.size}</p>

        <p>
          ${item.price.toLocaleString("vi-VN")}đ
          × ${item.quantity}
        </p>

        <button
           class="remove-cart"
           data-id="${item._id}"
           data-size="${item.size}"
           data-color="${item.color}"> Xóa
        </button>
      </div>
    </div>

  `).join("");

  // xóa sản phẩm trong giỏ hàng onclick 
  document.querySelectorAll(".remove-cart")
  .forEach(button => {

    button.onclick = () => {
      removeCartItem(
        button.dataset.id,
        button.dataset.size,
        button.dataset.color
      );
    };
  });

  // tính tổng tiền
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;  }, 0);

  cartTotal.innerText =
    total.toLocaleString("vi-VN") + "đ"; 
}

// mở sidebar cart
function openCart() {
  document.getElementById("cartSidebar")
    .classList.add("active");

  document.body.classList.add("no-scroll");
}


// đóng sidebar cart
function closeCart() {
  document.getElementById("cartSidebar")
    .classList.remove("active");
  document.body.classList.remove("no-scroll");
}


// khởi tạo event cart
function initCart() {
  document.getElementById("closeCart")
    .onclick = closeCart;

  document.getElementById("cartOverlay")
    .onclick = closeCart;
}

export {
  getCart,
  saveCart,
  addToCart,
  removeCartItem,
  renderCart,
  openCart,
  closeCart,
  initCart
};