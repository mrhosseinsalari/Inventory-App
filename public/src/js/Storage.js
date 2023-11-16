const categories = [
  {
    id: 1,
    title: "frontend",
    description: "frontend of applications",
    createdAt: "2021-11-01T10:47:26.889Z",
  },
  {
    id: 2,
    title: "backend",
    description: "backend of applications",
    createdAt: "2021-10-01T10:47:26.889Z",
  },
];

export default class Storage {
  // add new category
  // save category
  // getAllCategories

  static getAllCategories() {
    // product , category => get from localStorage
    const savedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];

    // sort => descending
    const sortedCategories = savedCategories.sort((categoryA, categoryB) => {
      return new Date(categoryB.createdAt) - new Date(categoryA.createdAt);
    });

    return sortedCategories;
  }
}
