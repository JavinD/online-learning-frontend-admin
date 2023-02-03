import { useLottie } from "lottie-react";
import React from "react";

type Props = {
  animationData: any;
};

export default function LottieComponent({ animationData }: Props) {
  const options = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(options);

  return <>{View}</>;
}
