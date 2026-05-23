import { renderCart, Checkout } from "../modules/cart.js";
import { getCart } from "../services/cart.js";
import { createOrder } from "../services/order.js";
import { showToast } from "../utils/toast.js";

async function handleOrder() {

  try{
    const data = await getCart();
    const cart = data.items || [];
    if(!cart.length){
      showToast(
        "Giỏ hàng đang trống",
        "warning"
      );
      return;
    }

    const orderData = {customerName:document.getElementById("customerName").value.trim(),

      email:document.getElementById("email").value.trim(),
      phone:document.getElementById("phone").value.trim(),
      city:document.getElementById("city").value,
      district:document.getElementById("district").value,
      ward:document.getElementById("ward").value,
      address:document.getElementById("address").value.trim(),
      note:document.getElementById("note").value.trim(),
      paymentMethod:document.getElementById("paymentMethod").value,

      items:cart.map(item=>({
        product:item.productId._id,
        name:item.productId.name,
        image:item.productId.thumbnail,
        price:item.productId.price,
        quantity:item.quantity,
        size:item.size,
        color:item.color
      }))
    };

    if(!orderData.customerName || !orderData.phone || !orderData.address){
      showToast(
        "Vui lòng nhập đủ thông tin",
        "error"
      );
      return;
    }

    const result =await createOrder(orderData);
    if(result.success){
      showToast(
        "Đặt hàng thành công",
        "success"
      );
      // render lại cart
      await renderCart();
      history.pushState({},"","/home");
      window.renderRoute(
        "/home"
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
}

export async function initCheckout(){
  await Checkout();

  document.getElementById("placeOrderBtn")?.addEventListener(
    "click",
    handleOrder
  );
}