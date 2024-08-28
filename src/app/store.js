import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Par défaut, utilise localStorage pour le web
import formReducer from "../feature/formSlice";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root", // Clé pour stocker l'état dans localStorage
  storage,
  whitelist: ["form"], // Les reducers qu'on veux voir "persister"
};

const rootReducer = combineReducers({
  form: formReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (
    getDefaultMiddleware //Suppresion de la sérialisation (globalement)de redux persist - error console
  ) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
