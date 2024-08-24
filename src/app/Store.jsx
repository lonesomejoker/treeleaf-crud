import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { listReducer } from "./slices/DetailSlice";
import ApiFetch from "../services/ApiFetch";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
  
  const reducer = combineReducers({
    [ApiFetch.reducerPath]:ApiFetch.reducer,
    listslice:listReducer,
  });
  const persistedReducer = persistReducer(persistConfig, reducer);
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(ApiFetch.middleware),
  });