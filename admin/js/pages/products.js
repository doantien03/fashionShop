import { getProducts } from "../services/products.js";
import { createProduct }from "../services/products.js";
import {uploadImage} from "../services/upload.js";

export function renderProducts(){
  return `

<div class="products-page">
  <div class="page-header">
    <h1>Quản lý sản phẩm</h1>
    <button id="add-product-btn"> + Thêm sản phẩm </button>
  </div>

  <div id="products-list"></div>
</div>

<div id="product-modal"
     class="modal hidden">
  <div class="modal-content">
    <span
      id="close-modal"
      class="close">×</span>
    <h2>Thêm sản phẩm</h2>
    <form id="product-form">
      <input
        id="name"
        placeholder="Tên sản phẩm">

      <input
        id="price"
        type="number"
        placeholder="Giá">

      <input
        id="category"
        placeholder="Danh mục">

      <input
        id="type"
        placeholder="Loại">

      <input
       type="file"
       id="thumbnail-file"
       accept="image/*">

      <img
       id="thumbnail-preview"
       class="thumbnail-preview">

      <textarea
        id="description"
        placeholder="Mô tả"></textarea>

      <input
        id="stock"
        type="number"
        placeholder="Tồn kho">

      <h3>Sizes</h3>
      <div class="sizes-box">
        <label>
          <input
            type="checkbox"
            value="S"
            class="size"> S </label>
        <label>
          <input
            type="checkbox"
            value="M"
            class="size"> M </label>

        <label>
          <input
            type="checkbox"
            value="L"
            class="size"> L </label>

        <label>
          <input
            type="checkbox"
            value="XL"
            class="size"> XL </label>
      </div>

      <h3>Màu sắc</h3>
      <div id="colors-container">
      </div>

      <button
        type="button"
        id="add-color-btn">  + Thêm màu </button>
      <br><br>

      <button
        type="submit"> Lưu sản phẩm </button>
    </form>
  </div>
</div>
`;
}

export async function initProducts(){
  const data = await getProducts();

  renderProductsTable(data.products || data);
  bindModal();
  bindColors();
  bindThumbnailPreview();
  bindCreateProduct();
}

function renderProductsTable(products){
  const container = document.getElementById("products-list");

  container.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Ảnh</th>
          <th>Tên</th>
          <th>Giá</th>
          <th>Kho</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(product=>`
          <tr>
            <td>
              <img
                src="${product.thumbnail}"
                class="product-thumb">
            </td>
            <td> ${product.name} </td>
            <td> ${product.price.toLocaleString("vi-VN")}đ </td>
            <td> ${product.stock} </td>
            <td> ${product.isActive? "Hiển thị": "Ẩn"} </td>
            <td> <button
                class="edit-btn"
                data-id="${product._id}"> Sửa </button>

              <button
                class="delete-btn"
                data-id="${product._id}"> Xóa </button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function bindModal(){
  const modal = document.getElementById("product-modal");
  document.getElementById("add-product-btn").addEventListener("click",
    () => { modal.classList.remove(
        "hidden");
    }
  );

  document.getElementById("close-modal").addEventListener("click",
    () => { modal.classList.add(
        "hidden");
    }
  );
}

function bindColors(){
  document.getElementById("add-color-btn").addEventListener("click",
    () => { const container = document.getElementById("colors-container");
      const row = document.createElement("div");
      row.className ="color-row";

      row.innerHTML = `
      
      <input
      class="color-name"
      placeholder="Tên màu">

      <input
      class="color-code"
      placeholder="#ffffff">

      <input
      type="file"
      class="color-file"
      accept="image/*">

      <img
      class="color-preview"
      width="80">

      <button
      type="button"
      class="remove-color"> X </button>
      `;
      container.appendChild(row);

      const fileInput =row.querySelector(".color-file");
            fileInput.addEventListener("change",
              e=>{
                const file = e.target.files[0];
                if(!file){
                  return;
                }

            row.querySelector(".color-preview").src = URL.createObjectURL(file);
          }
        );
      }
    );
  }

function bindCreateProduct(){
  document.getElementById("product-form").addEventListener("submit",
    async e=>{
      e.preventDefault();
      const sizes = [...document.querySelectorAll(".size:checked")]
        .map(s=>s.value);

      const colorRows = document.querySelectorAll(".color-row");
      const colors = [];
      for(const row of colorRows){

      const file = row.querySelector(".color-file").files[0];
      let image = "";
      if(file){
        const uploadResult = await uploadImage(file,category);
          image = uploadResult.url;
        }
        colors.push({
          name: row.querySelector(".color-name").value,
          code: row.querySelector(".color-code").value,
          image
        });
      }
    
      const category = document.getElementById("category").value;
      const file = document.getElementById("thumbnail-file").files[0];
      let thumbnail = "";
      if(file){
      const uploadResult =await uploadImage(file,category);

      if(uploadResult.success){
        thumbnail = uploadResult.url;
        }
      }

      const product = {
        name: document.getElementById("name").value,

        price: Number(document.getElementById("price").value),

        category: document.getElementById("category").value,

        type: document.getElementById("type").value,

        thumbnail,

        description: document.getElementById("description").value,

        stock: Number(document.getElementById("stock").value),

        sizes,

        colors,

        isActive:true
      };

      const result = await createProduct(product);
      console.log(result);
    }
  );
}

function bindThumbnailPreview(){
  const input =document.getElementById("thumbnail-file");
  if(!input){
    return;
  }

  input.addEventListener("change",
    e=>{
      const file =e.target.files[0];
      if(!file){
        return;
      }
      document.getElementById("thumbnail-preview").src = URL.createObjectURL(file);
    }
  );
}