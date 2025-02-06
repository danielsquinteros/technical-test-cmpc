import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import metricReducer from './slices/metricSlice';
import productReducer from './slices/productSlice';
import { productsApi } from '../domains/products/api/products';
import { metricsApi } from '../domains/metrics/api/metrics';

const rootReducer = combineReducers({
    products: productReducer,
    metrics: metricReducer,
    [metricsApi.reducerPath]: metricsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  });

  const apiMiddleware = [
    metricsApi.middleware,
    productsApi.middleware,
  ]

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        ...apiMiddleware
    ])
})

setupListeners(store.dispatch);

export default store;