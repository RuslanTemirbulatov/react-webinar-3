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
    };
  }

  async fetchSign(login, password) {
    fetch("/api/v1/users/sign", {
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
        console.log("Успешная авторизация", data);
      })
      .catch((error) => {
        console.error(
          "Ошибка при отправке запроса на авторизацию",
          error.message
        );
      });
  }

}

export default AuthState;
