import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import PageElement from "../../components/page-element";
import { useLanguage } from "../../store/language-context";
import Navbar from "../../components/navbar";

function Main() {
  const store = useStore();
  const navigate = useNavigate();
  const idItem = localStorage.getItem("idItem");
  const location = useLocation();
  const { language } = useLanguage();
  const translations = require(`../../lang/${language ?? "ru"}.json`);
  const params = useParams();
  const select = useSelector((state) => ({
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
    itemPage: state.catalog.item,
    headerTitle: state.catalog.headerTitle,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.catalog.load();
    if (idItem) store.actions.catalog.loadOne(idItem);
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    handlePageChange: useCallback(
      (page) => {
        store.actions.catalog.getSkipItems(page);
        localStorage.setItem("currentPage", page);
      },
      [store]
    ),
    openPageItem: useCallback(
      (_id) => {
        store.actions.catalog.setIdItem(_id);
        store.actions.catalog.loadOne(_id);
        navigate(`/${_id}`);
        localStorage.setItem("idItem", _id);
      },
      [store]
    ),
    fetchLoad: useCallback(
      (_id) => {
        store.actions.catalog.loadOne(_id);
      },
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            onOpenItem={callbacks.openPageItem}
          />
        );
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head
        title={
          location.pathname === "/"
            ? `${translations.shop}`
            : select.itemPage.title
        }
      />
      <Navbar
        onOpen={callbacks.openModalBasket}
        onPageChange={callbacks.handlePageChange}
        amount={select.amount}
        sum={select.sum}
      />
      <Routes>
        <Route
          path="/:id"
          element={
            <PageElement
              item={select.itemPage}
              onAdd={callbacks.addToBasket}
              onLoad={callbacks.fetchLoad}
            />
          }
        />
        <Route
          path="/"
          element={
            <>
              <List list={select.list} renderItem={renders.item} />
              <Pagination
                totalPages={select.totalPages}
                currentPage={select.currentPage}
                onPageChange={callbacks.handlePageChange}
              />
            </>
          }
        />
      </Routes>
    </PageLayout>
  );
}

export default memo(Main);
