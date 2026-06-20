export function productCard(p) {
  return `
    <div class="product" data-id="${p._id}">
      
      <div class="product-img">
        <img 
          id="img-${p._id}" 
          src="${p.thumbnail}" 
          alt="${p.name}" 
          loading="lazy"
        />

        <div class="overlay">
          <button class="btn-buy" data-id="${p._id}">
            <img src="../assets/icons/cart.svg" class="icon" />
            Mua nhanh
          </button>
          
          <div class="divider"></div>

          <button class="btn-detail" data-id="${p._id}">
            <img src="../assets/icons/eye.svg" class="icon" />
            Xem chi tiết
          </button>
        </div>
      </div>

      <div class="btn-colors">
        ${(p.colors || []).map(c => `
          <span 
            class="color-item"
            style="background-color: ${c.code}"
            data-image="${c.image}"
            title="${c.name}">
          </span>
        `).join("")}
      </div>

      <p class="product-name">${p.name}</p>
      <p class="product-price">${p.price.toLocaleString("vi-VN")}đ</p>
    </div>
  `;
}

