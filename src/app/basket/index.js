import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useLanguage } from '../../store/language-context';
import { useNavigate } from 'react-router-dom'


function Basket() {
  const navigate = useNavigate()
  const store = useStore();
  const { language } = useLanguage();
  const translations = require(`../../lang/${language ?? 'ru'}.json`);
  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    onOpenItem: useCallback((_id) => {
      store.actions.catalog.setIdItem(_id);
        store.actions.catalog.loadOne(_id);
        navigate(`/${_id}`);
        localStorage.setItem("idItem", _id);
    }, [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} onOpenItem={callbacks.onOpenItem} onClose={callbacks.closeModal}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={translations.cart} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum}/>
    </ModalLayout>
  );
}

export default memo(Basket);
