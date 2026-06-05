export function initOrderSuccess(){

  const orderId = location.pathname.split("/")[2];
  document.getElementById("success-order-id").innerText = orderId;
  document.getElementById("view-order-btn").onclick = ()=>{
    history.pushState({},"","/my-orders");

    window.renderRoute("/my-orders");
  };

  document.getElementById("back-home-btn").onclick = ()=>{
    history.pushState({},"","/home");

    window.renderRoute("/home");

  };

}