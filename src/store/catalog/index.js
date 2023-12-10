import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }
  initState() {
    return {
      list: [],
      currentPage: 1,
      totalPages: 0,
      skipItems: 0,
      item: {},
      idItem: null,
    };
  }

  async load() {
    const response = await fetch(
      `api/v1/articles?limit=10&skip=${+(localStorage.getItem('currentPage')) * 10 - 10}&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalPages: Math.ceil(json.result.count / 10),
      },
      "Загружены товары из АПИ"
    );
  }

  async loadOne(id) {
    const response = await fetch(
      `api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        item: json.result,
      },
      "Загружены товары из АПИ"
    );
  }
  getSkipItems(page) {
    this.setState({
      ...this.getState(),
      currentPage: page,
      skipItems: page * 10 - 10,
    });
  }

  setIdItem(id) {
    this.setState({
      ...this.getState(),
      idItem: id,
    });
  }
}

export default Catalog;
