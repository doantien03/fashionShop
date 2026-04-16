const list = document.getElementById("productList");

function renderProducts(data) {
  list.innerHTML = "";

  data.forEach(p => {
    list.innerHTML += `
      <div class="product">
        <div class="product-img">
          <img src="${p.thumbnail}" id="img-${p.id}">

          <div class="overlay">
            <button>🛒 Mua nhanh</button>
            <button>👁️ Xem chi tiết</button>
          </div>
        </div>

        <div class="colors">
          ${p.colors.map(c => `
            <span 
              style="background:${c.name}"
              onclick="changeColor(${p.id}, '${c.image}')"
            ></span>
          `).join("")}
        </div>

        <h4>${p.name}</h4>
        <p><b>${p.price.toLocaleString()}đ</b></p>
      </div>
    `;
  });
}

// đổi màu
function changeColor(id, image) {
  document.getElementById("img-" + id).src = image;
}

renderProducts(products);