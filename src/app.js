import React, { useCallback } from "react";
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartInfo from "./components/cartInfo";
import Cart from "./components/cart";
import Modal from "./components/modal";
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartList = store.getState().cartList;
  const fullPriceCart = store.getState().fullPriceCart;
  const countCart = store.getState().countCart;
  const activeModal = store.getState().activeModal;
  const callbacks = {
    onAddItemCart: useCallback(
      (code, title, price) => {
        store.addItemCart(code, title, price);
      },
      [store]
    ),
    onClickOpenCart: useCallback(() => {
      store.clickOpenCart();
    }, [store]),
    deleteCartItem: useCallback(
      (code) => {
        store.deleteItemCart(code);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <CartInfo
        cartList={cartList}
        cartOpen={callbacks.onClickOpenCart}
        fullPriceCart={fullPriceCart}
        countCart={countCart}
      />
      <List list={list} onActionItem={callbacks.onAddItemCart} />
      <Modal active={activeModal} setActive={callbacks.onClickOpenCart}>
        <Cart
          cartList={cartList}
          cartOpen={callbacks.onClickOpenCart}
          deleteCartItem={callbacks.deleteCartItem}
          fullPriceCart={fullPriceCart}
          activeModal={activeModal}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
