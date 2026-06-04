import { getProducts } from "../services/product.js";
import { addToCart, renderCart, openCart} from "../modules/cart.js";

let currentProduct = null;
let selectedColor = "";
let currentIndex = 0;

// thông báo
function showMessage(text){
  const msg = document.getElementById("product-message");
  msg.innerText = text;
  msg.classList.add("show");
  setTimeout(() => {
    msg.classList.remove("show");
    msg.innerText = "";
  },3000);
}

// mở modal 
export async function openModal(id) {
  const res = await getProducts();
  currentProduct = res.data.products.find(
    p => p._id === id
  );
  if (!currentProduct) return;
  const modal = document.getElementById("productModal");
  modal.classList.add("active");

  // khóa scroll nền
  document.body.classList.add("no-scroll");
  renderModal();
}

// render modal
function renderModal() {

  const modalName = document.getElementById("modal-name");
  const modalPrice = document.getElementById("modal-price");
  const mainImg = document.getElementById("modal-main-img");
  const thumbs = document.getElementById("modal-thumbs");
  const colors = document.getElementById("modal-colors");
  const selectColor = document.getElementById("select-color");
  const qty = document.getElementById("qty");

  document.getElementById("view-detail").onclick = (e) => { e.preventDefault();
  closeModal();
  history.pushState({},"",`/product/${currentProduct._id}`);
  window.renderRoute(`/product/${currentProduct._id}`);
  };

  modalName.innerText = currentProduct.name;
  modalPrice.innerText = currentProduct.price.toLocaleString("vi-VN") + "đ";


  // reset
  selectedColor = null;
  qty.value = 1;
  document.querySelectorAll(".sizes span").forEach(size=>{size.classList.remove("active");});

  //  MAIN IMAGE
  mainImg.src = currentProduct.thumbnail;
  currentIndex = 0;

  function updateImage(index){
  currentIndex = index;

  const selected = currentProduct.colors[index];

  mainImg.src = selected.image;
  selectedColor = selected.name;
  // hiện tên màu
  selectColor.textContent = selected.name;
  // thumbnail active
  document.querySelectorAll(".thumb-item").forEach((img, i) => {
      img.classList.toggle("active",i === index);
    });
  // màu active
  const colorItems = document.querySelectorAll("#modal-colors .color-item");
  colorItems.forEach((item, i) => {
    item.classList.toggle("active",i === index);
  });
    selectedColor = selected.name;
    document.getElementById("select-color").textContent = selected.name;
  }

  document.getElementById("nextImg").onclick=()=>{
    let next = currentIndex+1;
    if(next>=currentProduct.colors.length){
        next=0;
    }
    updateImage(next);
  };

document.getElementById("prevImg").onclick=()=>{
    let prev = currentIndex-1;
    if(prev<0){
        prev = currentProduct.colors.length-1;
    }
    updateImage(prev);
};
  //  THUMBNAILS 
  thumbs.innerHTML = currentProduct.colors.map((c, index) => `
      <img
        src="${c.image}"
        data-image="${c.image}"
        class="thumb-item ${index === 0 ? "active" : ""}"
      />
    `).join("");

  // click thumbnail
  thumbs.onclick = (e) => {
  const img = e.target.closest(".thumb-item");
  if (!img) return;
  const index = Array.from(thumbs.children).indexOf(img);
  updateImage(index);
  };

  // COLORS
  colors.className="colors";
  colors.innerHTML =
    currentProduct.colors.map(c=>`
      <span
        class="color-item"
        data-image="${c.image}"
        data-name="${c.name}"
      >
        <img
          src="${c.image}"
          alt="${c.name}"
        >
      </span>
    `).join("");

  colors.onclick = (e) => {
  const color = e.target.closest(".color-item");
  if (!color) return;
  const index = Array.from(colors.children).indexOf(color);
  updateImage(index);
  };

  // SIZE
  document.querySelectorAll(".sizes span").forEach(size=>{
    size.onclick=()=>{
      document.querySelectorAll(".sizes span").forEach(s=>{s.classList.remove(
          "active"
        );
      });
      size.classList.add("active");
    };
  });

  // QUANTITY
  document.getElementById("plus").onclick=()=>{
    qty.value = Number(qty.value)+1;
  };

  document.getElementById("minus").onclick=()=>{
    if(qty.value>1){
      qty.value = Number(qty.value)-1;
    }
  };

  // ADD CART
  document.getElementById("add-cart").onclick=()=>{
    const activeSize = document.querySelector(".sizes span.active");
    if(!selectedColor || !activeSize){
      showMessage("Vui lòng chọn màu sắc và kích thước");
      return;
    }
    const product={
      _id:currentProduct._id,
      name:currentProduct.name,
      price:currentProduct.price,
      image:mainImg.src,
      color:selectedColor,
      size:activeSize.innerText,
      quantity:Number(qty.value)
    };
    addToCart(product);
    renderCart();
    openCart();
    closeModal();
  };
}

// INIT 
export function initModal() {
  document.getElementById("closeModal").onclick = closeModal;
  document.querySelector(".modal-overlay").onclick = closeModal;
}

// CLOSE 
function closeModal() {
  document.getElementById("productModal").classList.remove("active");
  document.body.classList.remove("no-scroll");
}