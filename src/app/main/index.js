import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import SignControl from '../../components/sign-control';
import useSelector from "../../hooks/use-selector";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const select = useSelector(state => ({
    categoryList: state.categoryList.categoryList,
    profileList: state.profile.profileList
  }));
  const store = useStore();

  useInit(() => {
    store.actions.categoryList.getCategoryList();
    store.actions.catalog.initParams();
  }, [], true);
  const {t} = useTranslate();

  const callbacks = {
    deleteProfile: useCallback(() => store.actions.profile.deleteProfile(), [store])
  }

  return (
    <PageLayout>
      <SignControl profileList={select.profileList} deleteProfile={callbacks.deleteProfile} />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <CatalogFilter categoryList={select.categoryList} />
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
