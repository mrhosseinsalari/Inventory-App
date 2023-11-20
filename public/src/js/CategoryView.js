import Storage from "./Storage.js";

const titleInput = document.querySelector("#category-title");
const descriptionInput = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const categoriesList = document.querySelector("#product-categories");

class CategoryView {
  constructor() {
    this.categories = [];
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
  }

  setApp() {
    this.categories = Storage.getAllCategories();
  }

  addNewCategory(e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    if (!title || !description) return;

    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();

    // update DOM : update select option in categories
    this.createCategoriesList();

    [titleInput, descriptionInput].forEach((item) => {
      item.value = "";
    });
  }

  createCategoriesList() {
    let result = `<option class="bg-slate-500 text-slate-300" value="">select a category</option>`;

    this.categories.forEach((category) => {
      result += `<option class="bg-slate-500 text-slate-300" value="${category.id}">${category.title}</option>`;
    });

    categoriesList.innerHTML = result;
  }
}

export default new CategoryView();
