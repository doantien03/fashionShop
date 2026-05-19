import { getCart, renderCart,Checkout } from "../modules/cart.js";
import { createOrder } from "../services/order.js";
import { showToast } from "../utils/toast.js";

async function handleOrder() {
  try {
    const cart = getCart();
    if (!cart.length) {
      showToast(
        "Giỏ hàng đang trống",
        "warning"
      );
      return;
    }

    const orderData = {
      customerName:document.getElementById("customerName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone:document.getElementById("phone").value.trim(),
      city:document.getElementById("city").value,
      district:document.getElementById("district").value,
      ward:document.getElementById("ward").value,
      address:document.getElementById("address").value.trim(),
      note:document.getElementById("note").value.trim(),
      paymentMethod:document.getElementById("paymentMethod").value,
      items: cart.map(item => ({
        product: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      }))
    };
    
    console.log(cart);
    console.log(orderData);
    
    if(
      !orderData.customerName ||
      !orderData.phone ||
      !orderData.address
    ){
      showToast(
        "Vui lòng nhập đủ thông tin",
        "error"
      );
      return;
    }

    // gọi API
    const result = await createOrder(orderData);
    if(result.success){
      showToast(
        "Đặt hàng thành công",
        "success"
      );
      // xóa giỏ hàng
      localStorage.removeItem(
        "cart"
      );
      renderCart();
      // chuyển trang
      history.pushState({},"","/home");
      window.renderRoute("/home");
    }
  }
  catch(error){
    console.log(error);
    showToast(
      "Lỗi server",
      "error"
    );
  }
}

export function initCheckout(){
  Checkout();
  document.getElementById("placeOrderBtn")?.addEventListener("click",handleOrder);
}