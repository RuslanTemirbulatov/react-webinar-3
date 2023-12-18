import React, { memo, useCallback } from "react";
import PageLayout from "../../../components/page-layout";
import SignControl from "../../../components/sign-control";
import Head from "../../../components/head";
import LocaleSelect from "../../../containers/locale-select";
import Navigation from "../../../containers/navigation";
import LoginPage from "..";
import useTranslate from "../../../hooks/use-translate";
import useStore from "../../../hooks/use-store";
import useSelector from "../../../hooks/use-selector";
import useInit from "../../../hooks/use-init";
import { useNavigate } from "react-router-dom";

const LoginArticle = () => {
  const store = useStore();
  const navigate = useNavigate();
  const callbacks = {
    postUser: useCallback(
      (login, password) => store.actions.auth.fetchSign(login, password),
      [store]
    ),
    getProfile: useCallback(() => store.actions.profile.getProfile(), [store]),
    deleteProfile: useCallback(
      () => store.actions.profile.deleteProfile(),
      [store]
    ),
  };

  const { t } = useTranslate();

  useInit(() => {
    if (localStorage.getItem("token")) {
      navigate("/profile");
    }
  }, []);

  const select = useSelector((state) => ({
    profileList: state.profile.profileList,
    errorMessage: state.auth.errorMessage,
  }));

  return (
    <PageLayout>
      <SignControl
        deleteProfile={callbacks.deleteProfile}
        profileList={select.profileList}
        buttonLogin={t("sign")}
        buttonLogout={t("logout")}
      />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginPage
        postUser={callbacks.postUser}
        profileList={select.profileList}
        getProfile={callbacks.getProfile}
        errorMessage={select.errorMessage}
      />
    </PageLayout>
  );
};

export default memo(LoginArticle);
