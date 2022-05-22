import { View, Text } from "react-native";
import React, { useContext } from "react";
import { DataContext } from "../App";

const MiscValue = () => {
  const { data } = useContext(DataContext);
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 32,
      }}
    >
      {[
        ["Humidity", `${data.current.humidity}%`],
        ["UV Index", `${data.current.uv}`],
        ["Wind Speed", `${data.current.wind_kph}km/h`],
      ].map(([label, value]) => (
        <View key={label} style={{ flex: 1 }}>
          <Text
            style={{
              color: "white",
              fontFamily: "Nunito_500Medium",
              textAlign: "center",
              fontSize: 24,
            }}
          >
            {value}
          </Text>
          <Text style={{ color: "white", textAlign: "center" }}>{label}</Text>
        </View>
      ))}
    </View>
  );
};

export default MiscValue;
