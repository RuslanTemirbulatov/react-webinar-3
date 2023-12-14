import React, {memo, useCallback} from "react";
import PageLayout from "../../page-layout";
import SignControl from "../../sign-control";
import Head from "../../head";
import LocaleSelect from "../../../containers/locale-select";
import Navigation from "../../../containers/navigation";
import LoginPage from "..";
import useTranslate from "../../../hooks/use-translate";
import useStore from "../../../hooks/use-store";
import useSelector from "../../../hooks/use-selector";
import useInit from "../../../hooks/use-init";
import {useNavigate} from "react-router-dom"


const LoginArticle = () => {
  const store = useStore();
  const navigate = useNavigate()
  const callbacks = {
    postUser: useCallback((login, password) => store.actions.auth.fetchSign(login, password), [store]),
    deleteProfile: useCallback(() => store.actions.profile.deleteProfile(), [store])
  }
  const { t } = useTranslate();

  useInit(() => {
    if (localStorage.getItem('token')) {
      navigate('/profile')
    }
  }, [])

  const select = useSelector(state => ({
    profileList: state.profile.profileList
  }));

  return (
    <PageLayout>
      <SignControl  deleteProfile={callbacks.deleteProfile} profileList={select.profileList} />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginPage postUser={callbacks.postUser} />
    </PageLayout>
  );
};

export default memo(LoginArticle);
