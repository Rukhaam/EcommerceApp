// src/Redux/root-reducer.js
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import directoryReducer from './Directory/directory.reducer.js';
import userReducer from './user/user.reducer.jsx';
import cartReducer from './cart/cart.reducer.jsx';
import ShopReducer from './Shop/shop.reducer.js';
const persistConfig = {
  key: 'root',
  storage,         
  whitelist: ['cart'], 
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory  :directoryReducer,
  shop : ShopReducer,
});

export default persistReducer(persistConfig, rootReducer);
