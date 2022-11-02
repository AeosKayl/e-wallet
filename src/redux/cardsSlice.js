import { createSlice } from "@reduxjs/toolkit";
// Vendor, card number, cardholder, expire month, expire year, CCV.
const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    allcards: [],
    // {
    //   vendor: "mastercard",
    //   cardHolder: "John Doe",
    //   expiryMonth:9,
    //   expiryYear: 2026,
    //   cvc:989,
    //   cardNumber:12345678,

    // }
  },
  status: "",
  reducers: {
    addNewCard: (state, action) => {
      console.log(action.payload);
      state.allcards.push(action.payload);
    },
    activateCard: (state, action) => {
      // skicka med ett kort och ändra dess isActive state och inaktivera resterande kort.
      state.allcards.forEach((card) => {
        if (card.cardNumber === action.payload.cardNumber) {
          card.active = true;
        } else {
          card.active = false;
        }
      });
    },
    deactivateCard: (state, action) => {
      // state.allcards.foreach(card => card.active = false)
      state.allcards.forEach((card) => (card.active = false));
    },
    removeCard: (state, action) => {
      let cardIndex = state.allcards.findIndex((card) => {
        if (card.cardNumber === action.payload.cardNumber) {
          return card;
        }
      });
      state.allcards.splice(cardIndex, 1);
    },
    sortCards: (state, action) => {
      state.allcards.sort((a, b) => b.active - a.active);
    },
  },
});

export const {
  addNewCard,
  activateCard,
  deactivateCard,
  removeCard,
  sortCards,
} = cardsSlice.actions;
export default cardsSlice.reducer;
