import { combineReducers } from 'redux';
import authReducer from './authReducer';
import imageReducer from './imageReducer';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root',
 storage,
  // blacklist: ['navigation'] // navigation will not be persisted
}
const authPersistConfig = {
  key: 'auth',
  storage:storage,
  blacklist: ['isAuthenticated']
}


const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  image: imageReducer
});

export default persistReducer(rootPersistConfig, rootReducer)

