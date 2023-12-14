import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoryState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categoryList: [],
    }
  }
  buildCategoryHierarchy(items, parent = null) {
    const result = [];
    for (const item of items) {
      if ((parent === null && item.parent === null) || (item.parent && item.parent._id === parent)) {
        const subcategories = this.buildCategoryHierarchy(items, item._id);
        if (subcategories.length > 0) {
          item.subcategories = subcategories;
        }
        result.push(item);
      }
    }
    return result;
  };
  async getCategoryList() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      categoryList: this.buildCategoryHierarchy(json.result.items)
    });

  }
}

export default CategoryState;
