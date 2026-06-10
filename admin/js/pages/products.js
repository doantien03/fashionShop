import { getProducts } from "../services/products.js";
import { createProduct }from "../services/products.js";

export function renderProducts(){

  return `

<div class="products-page">

  <div class="page-header">

    <h1>Quản lý sản phẩm</h1>

    <button id="add-product-btn">
      + Thêm sản phẩm
    </button>

  </div>

  <div id="products-list"></div>

</div>

<div
  id="product-modal"
  class="modal hidden"
>

  <div class="modal-content">

    <span
      id="close-modal"
      class="close"
    >
      ×
    </span>

    <h2>Thêm sản phẩm</h2>

    <form id="product-form">

      <input
        id="name"
        placeholder="Tên sản phẩm"
      >

      <input
        id="price"
        type="number"
        placeholder="Giá"
      >

      <input
        id="category"
        placeholder="Danh mục"
      >

      <input
        id="type"
        placeholder="Loại"
      >

      <input
        id="thumbnail"
        placeholder="Thumbnail URL"
      >

      <textarea
        id="description"
        placeholder="Mô tả"
      ></textarea>

      <input
        id="stock"
        type="number"
        placeholder="Tồn kho"
      >

      <h3>Sizes</h3>

      <div class="sizes-box">

        <label>
          <input
            type="checkbox"
            value="S"
            class="size"
          >
          S
        </label>

        <label>
          <input
            type="checkbox"
            value="M"
            class="size"
          >
          M
        </label>

        <label>
          <input
            type="checkbox"
            value="L"
            class="size"
          >
          L
        </label>

        <label>
          <input
            type="checkbox"
            value="XL"
            class="size"
          >
          XL
        </label>

      </div>

      <h3>Màu sắc</h3>

      <div id="colors-container">

      </div>

      <button
        type="button"
        id="add-color-btn"
      >

        + Thêm màu

      </button>

      <br><br>

      <button
        type="submit"
      >

        Lưu sản phẩm

      </button>

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
  bindCreateProduct();
}

function renderProductsTable(products){

  const container =
    document.getElementById(
      "products-list"
    );

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
                class="product-thumb"
              >

            </td>

            <td>
              ${product.name}
            </td>

            <td>

              ${product.price.toLocaleString("vi-VN")}đ

            </td>

            <td>

              ${product.stock}

            </td>

            <td>

              ${
                product.isActive
                ? "Hiển thị"
                : "Ẩn"
              }

            </td>

            <td>

              <button
                class="edit-btn"
                data-id="${product._id}"
              >

                Sửa

              </button>

              <button
                class="delete-btn"
                data-id="${product._id}"
              >

                Xóa

              </button>

            </td>

          </tr>

        `).join("")}

      </tbody>

    </table>

  `;

}

function bindModal(){

  const modal =
    document.getElementById(
      "product-modal"
    );

  document
  .getElementById(
    "add-product-btn"
  )
  .addEventListener(
    "click",
    ()=>{

      modal.classList.remove(
        "hidden"
      );

    }
  );

  document
  .getElementById(
    "close-modal"
  )
  .addEventListener(
    "click",
    ()=>{

      modal.classList.add(
        "hidden"
      );

    }
  );

}

function bindColors(){

  document
  .getElementById(
    "add-color-btn"
  )
  .addEventListener(
    "click",
    ()=>{

      const container =
        document.getElementById(
          "colors-container"
        );

      const row =
        document.createElement(
          "div"
        );

      row.className =
        "color-row";

      row.innerHTML = `

        <input
          class="color-name"
          placeholder="Tên màu"
        >

        <input
          class="color-code"
          placeholder="#ffffff"
        >

        <input
          class="color-image"
          placeholder="URL ảnh"
        >

        <button
          type="button"
          class="remove-color"
        >
          X
        </button>

      `;

      container.appendChild(row);

    }
  );

}

function bindCreateProduct(){

  document
  .getElementById(
    "product-form"
  )
  .addEventListener(
    "submit",
    async e=>{

      e.preventDefault();

      const sizes =
        [...document
        .querySelectorAll(
          ".size:checked"
        )]
        .map(
          s=>s.value
        );

      const colors =
        [...document
        .querySelectorAll(
          ".color-row"
        )]
        .map(row=>({

          name:
            row.querySelector(
              ".color-name"
            ).value,

          code:
            row.querySelector(
              ".color-code"
            ).value,

          image:
            row.querySelector(
              ".color-image"
            ).value

        }));

      const product = {

        name:
          document.getElementById(
            "name"
          ).value,

        price:Number(
          document.getElementById(
            "price"
          ).value
        ),

        category:
          document.getElementById(
            "category"
          ).value,

        type:
          document.getElementById(
            "type"
          ).value,

        thumbnail:
          document.getElementById(
            "thumbnail"
          ).value,

        description:
          document.getElementById(
            "description"
          ).value,

        stock:Number(
          document.getElementById(
            "stock"
          ).value
        ),

        sizes,

        colors,

        isActive:true

      };

      const result =
        await createProduct(
          product
        );

      console.log(result);

    }
  );

}