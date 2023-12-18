import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class AuthState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      errorMessage: ''
    };
  }

  async fetchSign(login, password) {
    await fetch("/api/v1/users/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    })
      .then(async (data) => {
        const res = await data.json()
        if (!data.ok) {
          this.setState({
            ...this.getState(),
            errorMessage: res.error.data.issues[0].message,
          });
        }
        else localStorage.setItem("token", res.result.token);
      })
      .catch((error) => {
        this.setState({
          ...this.getState(),
          errorMessage: 'ошибка сервера',
        });
      });
  }

  clearErrorMessage() {
    this.setState({
      ...this.getState(),
      errorMessage: null,
    });
  }
}

export default AuthState;
