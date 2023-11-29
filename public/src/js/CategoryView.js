import Storage from "./Storage.js";

const titleInput = document.querySelector("#category-title");
const descriptionInput = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const categoriesList = document.querySelector("#product-category");
const editCategorySelect = document.querySelector("#edit-product-category");

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

    this.toggleCategoryForm("hidden");
  }

  createCategoriesList() {
    let result = `<option class="bg-slate-500 text-slate-300" value="">select a category</option>`;

    this.categories.forEach((category) => {
      result += `<option class="bg-slate-500 text-slate-300" value="${category.id}">${category.title}</option>`;
    });

    categoriesList.innerHTML = result;
    editCategorySelect.innerHTML = result;
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
