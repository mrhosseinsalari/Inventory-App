export default class Storage {
  static getAllCategories() {
    const savedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];

    return savedCategories.sort((categoryA, categoryB) => {
      return new Date(categoryB.createdAt) - new Date(categoryA.createdAt);
    });
  }

  static saveCategory(categoryToSave) {
    const categories = this.getAllCategories();

    const existedItem = categories.find((c) => c.id === categoryToSave.id);

    if (existedItem) {
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      categories.push(categoryToSave);
    }

    localStorage.setItem("categories", JSON.stringify(categories));
  }

  static getAllProducts() {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

    return savedProducts.sort((productA, productB) => {
      return new Date(productB.createdAt) - new Date(productA.createdAt);
    });
  }

  static saveProduct(productToSave) {
    const products = this.getAllProducts();

    const existedItem = products.find((p) => p.id === productToSave.id);

    if (existedItem) {
      existedItem.title = productToSave.title;
      existedItem.quantity = productToSave.quantity;
      existedItem.category = productToSave.category;
    } else {
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      products.push(productToSave);
    }

    localStorage.setItem("products", JSON.stringify(products));
  }
}
