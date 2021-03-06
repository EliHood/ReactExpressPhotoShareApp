import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import persistReduc from './reducers';
// NEW CODE: You can also remove the redux-thunk dependency
import sagas from './sagas';
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  persistReduc,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagas.map(sagaMiddleware.run);
/* Redux-Persist + Store */

export const persistor = persistStore(store, () => {
  store.getState()
});





