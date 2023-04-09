import React from "react";
import { Platform } from "react-native";
import { Path, Svg } from "react-native-svg";

const ArrowUp = () => {
  return (
    <Svg
      width={Platform.isPad ? "38" :"24"}
      height={Platform.isPad ? "38" :"24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M18 15L12 9L6 15"
        stroke="#708090"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ArrowUp;
