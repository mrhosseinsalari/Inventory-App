import Storage from "./Storage.js";

const titleInput = document.querySelector("#product-title");
const quantityInput = document.querySelector("#product-quantity");
const categorySelectOption = document.querySelector("#product-category");
const addNewProductBtn = document.querySelector("#add-new-product");
const productsList = document.querySelector("#products-list");

class ProductView {
  constructor() {
    this.products = [];
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }

  addNewProduct(e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const quantity = quantityInput.value.trim();
    const category = categorySelectOption.value;

    if (!title || !quantity || !category) return;

    Storage.saveProduct({ title, quantity, category });
    this.products = Storage.getAllProducts();

    // update DOM : update products list
    this.createProductsList();

    [titleInput, quantityInput].forEach((item) => {
      item.value = "";
    });
  }

  createProductsList() {
    let result = "";

    this.products.forEach((product) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id === Number(product.category)
      );

      result += `
        <div class="flex items-center justify-between">
          <span class="text-slate-400">${product.title}</span>
          <div class="flex items-center gap-x-3">
            <span class="text-slate-400">${new Date(
              product.createdAt
            ).toLocaleDateString("fa-IR")}</span>
            <span class="block px-3 py-0.5 text-slate-400 border border-slate-400 rounded-2xl text-sm">${
              selectedCategory.title
            }</span>
            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 border-2 border-slate-400 text-slate-300">${
              product.quantity
            }</span>
            <button class="border px-2 py-0.5 rounded-2xl border-red-400 text-red-400" data-product-id="${
              product.id
            }">delete</button>
          </div>
        </div>
        `;
    });

    productsList.innerHTML = result;
  }
}

export default new ProductView();
