import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import LoginPage from '../components/login-page';
import LoginArticle from '../components/login-page/login-article.js';
import ProfilePage from '../components/profile-page/index.js';
import ProfileArticle from '../components/profile-page/profile-article/index.js';
import useStore from '../hooks/use-store.js';
import useInit from '../hooks/use-init.js';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();

  useInit(() => {
    store.actions.profile.getProfile();
  }, [], true);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<LoginArticle />}/>
        <Route path={'/profile'} element={<ProfileArticle />}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
