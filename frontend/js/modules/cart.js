import { getCart,addCart,removeCart,updateCart } from "../services/cart.js";

// thêm sản phẩm vào cart
async function addToCart(product){
  await addCart({
    productId: product._id,
    color: product.color,
    size: product.size || "",
    quantity: product.quantity,
  });
  await renderCart();
}

// xóa sản phẩm khỏi giỏ hàng
async function removeCartItem(productId,size,color){
  await removeCart(productId,size,color);
  await renderCart();
  await updateCount();
}


// tăng giảm số lượng
async function updateToCart(productId,size,color,type){
  await updateCart(productId,size,color,type);
  await renderCart();
  await updateCount();
}

// Hiển thị tổng sản phẩm ở thanh cart header
async function updateCount(){
  const data = await getCart();
  const cart = data.items || [];
  const countEl = document.getElementById("cart-count");

  if(!countEl) return;
  const total = cart.reduce((sum,item)=> sum + item.quantity,0);
  countEl.innerText = total;
}

// lấy tổng tiền của cart
async function getCartTotal(){
  const data = await getCart();
  const cart = data.items || [];
  return cart.reduce((sum,item)=> sum + (item.productId.price * item.quantity),0);
}

// trả về thông tin sản phẩm ở trang checkout
async function Checkout(){
  const data = await getCart();
  const cart = data.items || [];
  const container = document.getElementById("checkout-products");

  container.innerHTML = cart.map(item=>{
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
          <p>Giá: ${item.productId.price.toLocaleString("vi-VN")}đ × ${item.quantity}</p>
        </div>
      </div>
    `;
  }).join("");

  // tổng tiền sản phẩm trang checkout
  const total = await getCartTotal();
  document.getElementById("checkout-subtotal").innerText = total.toLocaleString("vi-VN") + "đ";
  document.getElementById("checkout-total").innerText = total.toLocaleString("vi-VN") + "đ";
}
  

// render giỏ hàng
async function renderCart(){
  const data = await getCart();
  const cart = data.items || [];
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if(!cartItems) return;
  cartItems.innerHTML = cart.map(item=>{

  const selectedColor = item.productId.colors.find(
      c => c.name === item.color
    );

  const image = selectedColor?.image || item.productId.thumbnail;
    
    return`
    <div class="cart-item">
      <img src="${image}" />
      <div class="cart-info">
        <h4> ${item.productId.name} </h4>
        <p>Màu: ${item.color}</p>
        ${item.size ? `<p>Size: ${item.size}</p>` : ""}
        <p>Giá: ${item.productId.price.toLocaleString("vi-VN")}đ × ${item.quantity}</p>
        
        <button
          class="remove-cart"
          data-id="${item.productId._id}"
          data-size="${item.size}"
          data-color="${item.color}"
        >
          Xóa
        </button>
      </div>
    </div>
   `;
  }).join("");

  document.querySelectorAll(".remove-cart").forEach(button=>{
      button.onclick=()=>{
        removeCartItem(
          button.dataset.id,
          button.dataset.size,
          button.dataset.color
        );
      };
    });
  const total = await getCartTotal();
  cartTotal.innerText = total.toLocaleString("vi-VN") + "đ";
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