import { getProducts,createProduct,deleteProduct,updateProduct } from "../services/products.js";
import {uploadImage} from "../services/upload.js";
import { showToast } from "../utils/toast.js";

let editingProductId = null;
let isDelete = false;

export function renderProducts(){
  return `

<div class="products-page">
  <div class="page-header">
    <h1>Quản lý sản phẩm</h1>
    <button id="add-product-btn"> + Thêm sản phẩm </button>
    </div>

  <div id="products-list"></div>
  </div>

<div id="product-modal" class="modal hidden">
  <div class="modal-content">
    <span id="close-modal" class="close"> × </span>
    <h2 id="modal-title"> Thêm sản phẩm </h2>

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
       accept="image/*"
       >

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

      <h3>Size</h3>
      <div class="sizes-box">
        <label> <input type="checkbox" value="S" class="size"> <span> S </span> </label>
        <label> <input type="checkbox" value="M" class="size"> <span> M </span> </label>
        <label> <input type="checkbox" value="L" class="size"> <span> L </span> </label>
        <label> <input type="checkbox" value="XL" class="size"> <span> XL </span> </label>
      </div>

      <h3>Màu sắc</h3>
      <div id="colors-container">
      </div>

      <button type="button" id="add-color-btn">  + Thêm màu </button>

      <button
        type="submit"
        id="save-product-btn"> Lưu sản phẩm  <span class="btn-loader hidden"></span>
      </button>
    </form>
  </div>
</div>
`;
}

export async function initProducts(){
  const data = await getProducts();
  const products = data.products || data;

  renderProductsTable(products);
  bindModal();
  bindColors();
  bindThumbnailPreview();
  bindSaveProduct();
  bindDeleteProduct();
  bindEditProduct(products);
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
  const form = document.getElementById("product-form");
  document.getElementById("add-product-btn").addEventListener("click",
    () =>{
      // reset trạng thái edit
      editingProductId = null;
      // reset form
      form.reset();
      // reset colors
      document.getElementById("colors-container").innerHTML = "";
      // reset thumbnail preview
      const preview = document.getElementById("thumbnail-preview");
      if(preview){
        preview.src = "";
      }
      // đổi tiêu đề modal
      document.getElementById("modal-title").textContent = "Thêm sản phẩm";
      // mở modal
      modal.classList.remove("hidden");
    }
  );

  document.getElementById("close-modal").addEventListener("click",
    () => { modal.classList.add(
        "hidden");
    }
  );
}

function bindColors() {

    const container = document.getElementById("colors-container");
    const addColorBtn = document.getElementById("add-color-btn");

    // Thêm màu
    addColorBtn.addEventListener("click", () => {
      const row = document.createElement("div");
      row.className = "color-row";
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
        class="color-preview">

      <button
        type="button"
        class="remove-color">
        Xóa
      </button>
      `;
      container.appendChild(row);
    });

    // Preview ảnh
    container.addEventListener("change", (e) => {
    if (!e.target.classList.contains("color-file")) {
      return;
    }
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const row = e.target.closest(".color-row");
    row.querySelector(".color-preview").src = URL.createObjectURL(file);
    });

    // Xóa màu
    container.addEventListener("click", (e) => {
    if (!e.target.classList.contains("remove-color")) {
      return;
    }
    const row = e.target.closest(".color-row");
    if (row) {
      row.remove();
    }
   });
 }

// render các button color trong trang edit sản phẩm
function renderColors(colors = []) {
    const container = document.getElementById("colors-container");
    // clear UI cũ
    container.innerHTML = "";

    colors.forEach(color => {
    const row = document.createElement("div");
    row.className = "color-row";

    row.innerHTML = `
      <input class="color-name" placeholder="Tên màu" value="${color.name || ""}">
      <input class="color-code" placeholder="#ffffff" value="${color.code || ""}">
      <input type="file" class="color-file" accept="image/*">
      <img class="color-preview" src="${color.image || ""}" >
      <button type="button" class="remove-color"> Xóa </button>
    `;
    container.appendChild(row);
  });
}


function bindSaveProduct(){
  document.getElementById("product-form").onsubmit =
    async e=>{
      e.preventDefault();
      
      // kiểm tra điền dữ liệu
      const name = document.getElementById("name").value.trim();
      const price = document.getElementById("price").value;
      const category = document.getElementById("category").value.trim();
      if(!name || !price || !category){
        showToast("Vui lòng nhập đầy đủ thông tin","warning");
        return;  
      } 

      // nút loading
      const saveBtn = document.getElementById("save-product-btn");
      const loader = saveBtn.querySelector(".btn-loader");
      saveBtn.disabled = true;
      loader.classList.remove("hidden");
      
    try{
      const sizes = [...document.querySelectorAll(".size:checked")].map( s=> s.value);
      const category = document.getElementById("category").value;
      const colorRows = document.querySelectorAll(".color-row");

      const colors = [];
      for(const row of colorRows){

      const file = row.querySelector(".color-file").files[0];
      let image = row.querySelector(".color-preview")?.src || ""; // giữ màu khi vào edit mà không sửa
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
    
      const file = document.getElementById("thumbnail-file").files[0];
      let thumbnail = document.getElementById("thumbnail-preview")?.src || ""; // giữ ảnh khi vào edit mà không sửa
      if(file){
      const uploadResult = await uploadImage(file,category);

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

      let result;
      if(editingProductId){
        result = await updateProduct( editingProductId,product);
      }
      else{
        result = await createProduct(product);
      }
    
      // khi lưu thành công
      if(result.success){
        showToast(editingProductId ? "Cập nhật sản phẩm thành công" : "Thêm sản phẩm thành công","success");
        loader.classList.add("hidden");
        saveBtn.disabled = false;

        editingProductId = null;
        document.getElementById("product-modal").classList.add("hidden");
        initProducts();
      } else{
          showToast( result.message || "Lưu sản phẩm thất bại","error");
        }
      }
    catch(error){
        console.error("Lỗi lưu sản phẩm:",error);
        showToast("Lỗi xảy ra khi lưu sản phẩm", "error");
      }
    finally{
        loader.classList.add("hidden");
        saveBtn.disabled = false;
      }
    }
  };

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

// xóa sản phẩm
function bindDeleteProduct() {
    if (isDelete) return;
    isDelete = true;

    document.addEventListener("click", async e => {
      const btn = e.target.closest(".delete-btn");
      if (!btn) return;

    const id = btn.dataset.id;
    if (!confirm("Xóa sản phẩm?")) return;
    const result = await deleteProduct(id);
    if (result.success) {
      initProducts();
    }
  });
}

// edit sản phẩm
function bindEditProduct(products){
  document.addEventListener("click",
    e=>{
      const btn = e.target.closest(".edit-btn");
      if(!btn){
        return;
      }

      const product = products.find(
          p => p._id === btn.dataset.id
        );
      if(!product){
        return;
      }
      openEditModal(product);
    }
  );
}

// thêm dữ liệu vào modal
function openEditModal(product){
  editingProductId = product._id;
  document.getElementById("name").value = product.name;
  document.getElementById("price").value =product.price;
  document.getElementById("category").value = product.category;
  document.getElementById("type").value = product.type;
  document.getElementById("description").value = product.description;
  document.getElementById("stock").value = product.stock;
  document.querySelectorAll(".size").forEach(cb => {
    cb.checked = product.sizes?.includes(cb.value);
  });

  const thumbPreview = document.getElementById("thumbnail-preview");
  if (thumbPreview) {
  thumbPreview.src = product.thumbnail || "/default.png";
  }

  renderColors(product.colors);
  document.querySelectorAll(".size").forEach(cb => {
    cb.checked = product.sizes?.includes(cb.value);
  });
  document.getElementById("product-modal").classList.remove("hidden");
  document.getElementById("modal-title").textContent = "Cập nhật sản phẩm";
}