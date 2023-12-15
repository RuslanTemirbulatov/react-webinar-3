import React, { useState } from "react";
import "./style.css";
import {useNavigate} from "react-router-dom"

const LoginPage = (props) => {
  const [loginValue, setLoginValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const navigate = useNavigate()
  const postOnSubmit = async (e) => {
    e.preventDefault();
    await props.postUser(loginValue, passwordValue)
    navigate('/profile')
    props.getProfile()
  }
  console.log(props.errorMessage);
  return (
    <div className="login-page">
      <form className="login-page-form" onSubmit={postOnSubmit}>
        <h2>Вход</h2>
        <label htmlFor="input1">Логин</label>
        <input className="login-page-input" type="text" id="input1" value={loginValue} onChange={(e) => setLoginValue(e.target.value)} />
        <label htmlFor="input2">Пароль</label>
        <input className="login-page-input" type="text" id="input2" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
        <p>{props.errorMessage}</p>
        <button className="login-page-button">Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;
