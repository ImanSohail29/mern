import {configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import localStorage from 'reduxjs-toolkit-persist/lib/storage'

import userSlice from './slices/userSlice'
import thunk from 'redux-thunk';
import cartReducer from './slices/cartSlice';
import categoryReducer from './slices/categorySlice';

const userPersistConfig = {
    key: 'userInfo',
    storage:storageSession,
  }
  const cartPersistConfig = {
    key: 'cart',
    storage:localStorage,
  }
  const categoryPersistConfig = {
    key: 'categories',
    storage:localStorage,
  }
export const store=configureStore({
    reducer:{
        user:persistReducer(userPersistConfig,userSlice.reducer),
        cart:persistReducer(cartPersistConfig,cartReducer),
        category:persistReducer(categoryPersistConfig,categoryReducer)
    },
    middleware:[thunk]
}) 
export const persistor=persistStore(store)
