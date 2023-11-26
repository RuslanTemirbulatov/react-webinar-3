/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    let maxCode = 0;
    initState.list.map((item) => (
        maxCode = maxCode < item.code ? item.code : maxCode
      ));
    this.state = { ...initState, lastCode: 0, maxCode: maxCode}
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
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
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
   * Добавление новой записи
   */
  addItem() {
    this.state.maxCode += 1
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: this.state.maxCode, title: "Новая запись" },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          item.selected = !item.selected;
          item.selected && (item.counter = item.counter >= 1 ? item.counter + 1 : 1)
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
  /**
   * Сохраняем в стейт код последнего элемента
   * @param newLastCode
   */
}

export default Store;
