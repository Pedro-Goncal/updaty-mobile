import React from "react";
import { Platform } from "react-native";
import { Path, Svg } from "react-native-svg";

const ArrowLeft = () => {
  return (
<Svg width={Platform.isPad ? "38" :"28"} height={Platform.isPad ? "38" :"28"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M15 6L9 12L15 18" stroke="#708090" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>

  );
};

export default ArrowLeft;
