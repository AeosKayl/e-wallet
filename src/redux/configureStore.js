import { configureStore } from "@reduxjs/toolkit";
import cardsSlice from "./cardsSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    cards: cardsSlice,
    user: userSlice,
  },
});

export default store;
