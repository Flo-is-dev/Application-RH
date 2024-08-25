import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../feature/formSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default store;
