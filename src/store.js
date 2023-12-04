/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {...initState, cartList: [], activeModal: false, countCart: 0, fullPriceCart: 0,};
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

   /**
   * Добавление продукта в корзину
   * @param code
   * @param title
   * @param price
   */
  addItemCart(code, title, price) {
    const findItem = this.state.cartList.find((item) => item.code === code);
    if (findItem) {
      const updatedCartList = this.state.cartList.map((item) =>
        item.code === code ? { ...item, count: item.count + 1 } : item
      );
      this.setState({
        ...this.state,
        cartList: updatedCartList,
      });
    } else {
      this.setState({
        ...this.state,
        cartList: [...this.state.cartList, { code, title, price, count: 1 }],
      });
    }
    this.setFullPriceAndCountCart();
  }

  /**
   * Удаление продукта из корзины
   * @param code
   */
  deleteItemCart(code) {
    const findItem = this.state.cartList.find((item) => item.code === code)
    if (findItem) {
      this.state.fullPriceCart -= findItem.price * findItem.count
      this.state.countCart -= 1;
      this.setState({
        ...this.state,
        cartList: this.state.cartList.filter((item) => code !== item.code),
      })
    }
  };

  /**
   * Открытие, закрытие модального окна
   */
  clickOpenCart() {
    this.setState({
      ...this.state,
      activeModal: !this.state.activeModal
    })
  }

  /**
   * Обновление счетчика корзины и общей цены
   */
  setFullPriceAndCountCart() {
    this.setState({
      ...this.state,
      countCart: this.state.cartList.length,
      fullPriceCart: this.state.cartList.reduce((_, currentValue) => this.state.fullPriceCart + currentValue.price, 0)
    })
  }
}

export default Store;
