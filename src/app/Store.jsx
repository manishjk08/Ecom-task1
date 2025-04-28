import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/CartSlice';
import queryReducer from '../features/search/SearchSlice'
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/Localstorage';
import authReducer from '../features/auth/AuthSlice'

const preloadedState = loadFromLocalStorage();
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search:queryReducer,
    auth:authReducer
  },
  preloadedState,
});
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
