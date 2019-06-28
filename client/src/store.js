import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import rootReducer from './reducers';
 // NEW CODE: You can also remove the redux-thunk dependency
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas'
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagas.map(sagaMiddleware.run)
export default store;