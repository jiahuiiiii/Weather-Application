import { View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Appbar from "./Appbar";
import MinMaxDegree from './MinMaxDegree'
import WeatherDegree from "./WeatherDegree";
import MiscValue from "./MiscValue";

const TopSection = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 25,
        marginTop: 70,
      }}
    >
      <Appbar />
      <WeatherDegree />
      <MiscValue />
      <MinMaxDegree />
      <StatusBar translucent backgroundColor="transparent" />
    </View>
  );
};

export default TopSection;
