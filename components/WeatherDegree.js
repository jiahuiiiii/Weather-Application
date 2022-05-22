import { View, Text } from "react-native";
import React, { useContext } from "react";
import { DataContext } from "../App";

const WeatherDegree = () => {
  const { data } = useContext(DataContext);
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Text
        style={{
          fontSize: 84,
          color: "white",
          marginTop: 10,
          fontFamily: "Nunito_600SemiBold",
          textShadowColor: "rgba(0, 0, 0, 0.25)",
          textShadowOffset: { width: -1, height: 5 },
          textShadowRadius: 10,
        }}
      >{`${data.current.temp_c}°C`}</Text>
      <Text
        style={{ color: "white", fontSize: 20, fontFamily: "Nunito_500Medium" }}
      >
        {data.current.condition.text}
      </Text>
    </View>
  );
};

export default WeatherDegree;
