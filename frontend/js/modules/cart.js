import { getCart,addCart,removeCart,updateCart } from "../services/cart.js";

let cartCache = [];

async function syncCart() {
  const data = await getCart();
  cartCache = data.items || [];
  return cartCache;
}

// thêm thông tin sản phẩm vào giỏ
async function addToCart(product) {
  await addCart({
    productId: product._id,
    color: product.color,
    size: product.size || "",
    quantity: product.quantity,
  });

  await renderCart();
}

// xóa sản phẩm khỏi giỏ hàng
async function removeCartItem(productId, size, color) {
  await removeCart(productId, size, color);
  await renderCart();
}

// tăng giảm số lượng
async function updateToCart(productId, size, color, type) {
  await updateCart(productId, size, color, type);
  await renderCart();
}

// hiển thị tổng sản phẩm ở thanh cart header
function updateCount() {
  const countEl = document.getElementById("cart-count");
  if (!countEl) return;

  const total = cartCache.reduce(
    (sum, item) => sum + item.quantity, 0);

  countEl.innerText = total;
}

// lấy tổng tiền của cart
function getCartTotal() {
  return cartCache.reduce(
    (sum, item) =>
      sum + item.productId.price * item.quantity, 0);
  }

// trả về thông tin sản phẩm ở trang checkout
function Checkout() {
  const container = document.getElementById("checkout-products");
  if (!container) return;

  container.innerHTML = cartCache.map(item => {
    const selectedColor = item.productId.colors.find(
      c => c.name === item.color
    );
    const image = selectedColor?.image || item.productId.thumbnail;

    return `
      <div class="checkout-product">
        <img src="${image}" />
        <div>
          <h4>${item.productId.name}</h4>
          <p>Màu: ${item.color}</p>
          ${item.size ? `<p>Size: ${item.size}</p>` : ""}
          <p>
            Giá: ${item.productId.price.toLocaleString("vi-VN")}đ × ${item.quantity}
          </p>
        </div>
      </div>
    `;
  }).join("");

  const total = getCartTotal();

  const sub = document.getElementById("checkout-subtotal");
  const totalEl = document.getElementById("checkout-total");

  if (sub) sub.innerText = total.toLocaleString("vi-VN") + "đ";
  if (totalEl) totalEl.innerText = total.toLocaleString("vi-VN") + "đ";
}

// render giỏ hàng
async function renderCart() {
  await syncCart();

  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems) return;

  cartItems.innerHTML = cartCache.map(item => {
    const selectedColor = item.productId.colors.find(
      c => c.name === item.color
    );
    const image = selectedColor?.image || item.productId.thumbnail;

    return `
      <div class="cart-item">
        <img src="${image}" />
        <div class="cart-info">
          <h4>${item.productId.name}</h4>
          <p>Màu: ${item.color}</p>
          ${item.size ? `<p>Size: ${item.size}</p>` : ""}
          <p>
            Giá: ${item.productId.price.toLocaleString("vi-VN")}đ × ${item.quantity}
          </p>

          <button class="remove-cart"
            data-id="${item.productId._id}"
            data-size="${item.size}"
            data-color="${item.color}">
            Xóa
          </button>
        </div>
      </div>
    `;
  }).join("");

  /* KHÔNG BỊ DUPLICATE EVENT */
  cartItems.onclick = (e) => {
    const btn = e.target.closest(".remove-cart");
    if (!btn) return;
    removeCartItem(
      btn.dataset.id,
      btn.dataset.size,
      btn.dataset.color
    );
  };
  updateCount();

  const total = getCartTotal();
  if (cartTotal) {
    cartTotal.innerText = total.toLocaleString("vi-VN") + "đ";
  }
}


function openCart() {
  document.getElementById("cartSidebar")?.classList.add("active");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  document.getElementById("cartSidebar")?.classList.remove("active");
  document.body.classList.remove("no-scroll");
}


function initCart() {
  document.getElementById("closeCart")
    ?.addEventListener("click", closeCart);

  document.getElementById("cartOverlay")
    ?.addEventListener("click", closeCart);
}

export {
  addToCart,
  removeCartItem,
  renderCart,
  openCart,
  closeCart,
  initCart,
  updateToCart,
  updateCount,
  getCartTotal,
  Checkout
};
