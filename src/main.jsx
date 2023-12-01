import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import userSlice from "./features/userSlice.js"
import {apiSlice} from "./features/apiSlice.js"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"

import storage from "redux-persist/lib/storage"
import { PersistGate } from 'redux-persist/integration/react'

import Loader from "./components/Loader.jsx"

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  blacklist: [apiSlice.reducerPath]
}

const rootReducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  user: userSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddelware) =>
    getDefaultMiddelware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(apiSlice.middleware)
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <React.Suspense fallback={<Loader />}>
          <App />
        </React.Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
