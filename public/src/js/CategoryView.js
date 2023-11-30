import Storage from "./Storage.js";

const titleInput = document.querySelector("#category-title");
const descriptionInput = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const categoriesList = document.querySelectorAll(".categories-list");

const toggleAddCategoryBtn = document.querySelector("#toggle-add-category");
const categoryWrapper = document.querySelector("#category-wrapper");
const cancelAddCategoryBtn = document.querySelector("#cancel-add-category");

class CategoryView {
  constructor() {
    this.categories = [];
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));

    toggleAddCategoryBtn.addEventListener("click", () =>
      this.toggleCategoryForm("visible")
    );

    cancelAddCategoryBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggleCategoryForm("hidden");
    });
  }

  setApp() {
    this.categories = Storage.getAllCategories();
    this.createCategoriesList();
  }

  addNewCategory(e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    if (!title || !description) return;

    Storage.saveCategory({ title, description });
    this.setApp();

    [titleInput, descriptionInput].forEach((item) => {
      item.value = "";
    });

    this.toggleCategoryForm("hidden");
  }

  createCategoriesList() {
    let result = `<option class="bg-slate-500 text-slate-300" value="">select a category</option>`;

    this.categories.forEach((category) => {
      result += `<option class="bg-slate-500 text-slate-300" value="${category.id}">${category.title}</option>`;
    });

    categoriesList.forEach((list) => {
      list.innerHTML = result;
    });
  }

  toggleCategoryForm(visibility) {
    if (visibility === "visible") {
      categoryWrapper.classList.remove("hidden");
      toggleAddCategoryBtn.classList.add("hidden");
    } else if (visibility === "hidden") {
      categoryWrapper.classList.add("hidden");
      toggleAddCategoryBtn.classList.remove("hidden");
    }
  }
}

export default new CategoryView();
