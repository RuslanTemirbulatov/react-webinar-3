import React, { useEffect } from 'react';
import {createElement} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  useEffect(() => {
    const list = store.getState().list;
    let maxCode = 0;
    list.map((item) => (
      maxCode = maxCode < item.code ? item.code : maxCode
    ))
    store.setLastCode(maxCode)
  }, [])

  /**
 * Функцию добавления item
 */
  const addItem = () => {
    store.setLastCode(store.getState().lastCode + 1)
    store.addItem()
  }
  const list = store.getState().list;
  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={addItem}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                   onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{item.title} {item.counter && `| Выделяли ${item.counter} раз`}</div>
                <div className='Item-actions'>
                  <button onClick={() => store.deleteItem(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
