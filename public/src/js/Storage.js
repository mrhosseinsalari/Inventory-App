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

  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

    return savedProducts.sort((productA, productB) => {
      if (sort === "newest")
        return new Date(productB.createdAt) - new Date(productA.createdAt);
      if (sort === "oldest")
        return new Date(productA.createdAt) - new Date(productB.createdAt);
    });
  }

  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static saveProduct(productToSave) {
    const products = this.getAllProducts();

    const existedItem = products.find((p) => p.id === Number(productToSave.id));

    if (existedItem) {
      existedItem.title = productToSave.title;
      existedItem.quantity = productToSave.quantity;
      existedItem.category = productToSave.category;
    } else {
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      products.push(productToSave);
    }

    this.saveProducts(products);
  }

  static deleteProduct(id) {
    const savedProducts = this.getAllProducts();
    const filteredProducts = savedProducts.filter((p) => p.id !== Number(id));
    this.saveProducts(filteredProducts);
  }
}
