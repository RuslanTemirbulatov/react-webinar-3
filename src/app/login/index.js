import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";

const LoginPage = (props) => {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslate();

  const postOnSubmit = async (e) => {
    e.preventDefault();
    await props.postUser(loginValue, passwordValue);
    navigate("/profile");
    props.getProfile();
  };

  return (
    <div className="login-page">
      <form className="login-page-form" onSubmit={postOnSubmit}>
        <h2>{t("sign")}</h2>
        <label htmlFor="input1">{t("userName")}</label>
        <input
          className="login-page-input"
          type="text"
          id="input1"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
        />
        <label htmlFor="input2">{t("password")}</label>
        <input
          className="login-page-input"
          type="text"
          id="input2"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        {props.errorMessage && <p>{props.errorMessage}</p>}
        <button className="login-page-button">{t("login")}</button>
      </form>
    </div>
  );
};

export default LoginPage;
