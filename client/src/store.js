import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import rootReducer from './reducers';
import thunk from 'redux-thunk';
 // NEW CODE: You can also remove the redux-thunk dependency
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
 

const middleware = [thunk];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;