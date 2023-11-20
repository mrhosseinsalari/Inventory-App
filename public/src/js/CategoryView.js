import Storage from "./Storage.js";

const titleInput = document.querySelector("#category-title");
const descriptionInput = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");

export default class CategoryView {
  constructor() {
    this.categories = [];
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
  }

  addNewCategory(e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    if (!title || !description) return;

    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
  }
}
