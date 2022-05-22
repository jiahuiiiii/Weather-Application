import { View, Text } from "react-native";
import React, { useContext } from "react";
import { DataContext } from "../App";
import { FontAwesome } from "@expo/vector-icons";

const MinMaxDegree = () => {
  const { data } = useContext(DataContext);
  return (
    <View style={{ flexDirection: "row", marginTop: 32 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome name="caret-up" size={16} color="white" />
        <Text style={{ color: "white", fontSize: 16, marginLeft: 6 }}>
          {data.forecast.forecastday[0].day.maxtemp_c}°C
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 20,
        }}
      >
        <FontAwesome name="caret-down" size={16} color="white" />
        <Text style={{ color: "white", fontSize: 16, marginLeft: 6 }}>
          {data.forecast.forecastday[0].day.mintemp_c}°C
        </Text>
      </View>
    </View>
  );
};

export default MinMaxDegree;
