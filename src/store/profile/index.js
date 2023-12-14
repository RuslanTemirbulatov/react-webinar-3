import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class ProfileState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      profileList: {},
      fullUserInfo: {}
    };
  }

  async getProfile() {
    const response = await fetch("/api/v1/users/self?fields=*", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Token": localStorage.getItem('token')
      },
    })
    const json = await response.json();
    console.log(json.result, 'json');
    this.setState({
      ...this.getState(),
      profileList: json.result?.profile,
      fullUserInfo: json.result
    });
  }

  async deleteProfile() {
    await fetch("/api/v1/users/sign", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Token": localStorage.getItem('token')
      },
    })
    this.setState({
      ...this.getState(),
      profileList: {},
      fullUserInfo: {}
    });
  }
  

}

export default ProfileState;
