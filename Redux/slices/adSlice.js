import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clickCount: 0,
  lastAdShownTime: 0,
  fireAd: false,
  isFirstLoad: true
};

const adSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {
    handleFirstLoad: (state, action) => {
      state.isFirstLoad = false;
      console.log("First load now is false", state.isFirstLoad);
    },
    handleClick: (state) => {
      console.log("State ClickCount =====> ",state.clickCount);
      state.clickCount++;

      if (state.isFirstLoad) return;

      if (Date.now() - state.lastAdShownTime >= 15000) {
        state.fireAd = true;
        state.lastAdShownTime = Date.now();
      } else {
        state.fireAd = false;
      }

      console.log("Redux Fire ad ======> ",state.fireAd);
    },
  },
});

export const { handleClick, handleFirstLoad } = adSlice.actions;

export default adSlice.reducer;
