import { configureStore } from "@reduxjs/toolkit";

//Reducers
import contentSlice from "./slices/contentSlice";

const store = configureStore({
  reducer: {
    content: contentSlice,
  },
});

export default store;
