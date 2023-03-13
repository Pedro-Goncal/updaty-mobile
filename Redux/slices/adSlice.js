import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clickCount: 0,
  lastAdShownTime: 0,
  fireAd: false,
};

const adSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {
    handleClick: (state) => {
      console.log("State ClickCount =====> ",state.clickCount);
      state.clickCount++;

      if (
        state.clickCount % 2 === 0 &&
        Date.now() - state.lastAdShownTime >= 30000
      ) {
        state.fireAd = true;
        state.lastAdShownTime = Date.now();
      } else {
        state.fireAd = false;
      }
      console.log("Redux Fire ad ======> ",state.fireAd);
    },
  },
});

export const { handleClick } = adSlice.actions;

export default adSlice.reducer;
