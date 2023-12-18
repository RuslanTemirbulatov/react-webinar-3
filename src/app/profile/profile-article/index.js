import React, { useCallback } from "react";
import { memo } from "react";
import useStore from "../../../hooks/use-store";
import Navigation from "../../../containers/navigation";
import PageLayout from "../../../components/page-layout";
import Head from "../../../components/head";
import LocaleSelect from "../../../containers/locale-select";
import SignControl from "../../../components/sign-control";
import ProfilePage from "..";
import useTranslate from "../../../hooks/use-translate";
import useSelector from "../../../hooks/use-selector";
import useInit from "../../../hooks/use-init";
import { useNavigate } from "react-router-dom";

const ProfileArticle = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  useInit(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const callbacks = {
    deleteProfile: useCallback(
      () => store.actions.profile.deleteProfile(),
      [store]
    ),
  };

  const select = useSelector((state) => ({
    fullUserInfo: state.profile.fullUserInfo,
    profileList: state.profile.profileList,
  }));
  const store = useStore();

  return (
    <PageLayout>
      <SignControl
        profileList={select.profileList}
        deleteProfile={callbacks.deleteProfile}
        buttonLogin={t("sign")}
        buttonLogout={t("logout")}
      />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfilePage
        profileList={select.profileList}
        fullUserInfo={select.fullUserInfo}
      />
    </PageLayout>
  );
};

export default memo(ProfileArticle);
