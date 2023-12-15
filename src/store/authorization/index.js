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
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ошибка при авторизации");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.result.token);
      })
      .catch((error) => {
        this.setState({
          ...this.getState(),
          errorMessage: error.message,
        });
      });
  }

}

export default AuthState;
