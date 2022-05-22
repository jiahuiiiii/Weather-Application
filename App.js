import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect, createContext } from "react";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/dev";
import TopSection from "./components/TopSection";
import Hourly from "./components/Hourly";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

export const DataContext = createContext();

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });
  const API_KEY = "4b55e329853f4e5caa255915220705";
  const [data, setData] = useState();

  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=London&days=3&aqi=no&alerts=no`
    )
      .then((response) => response.json())
      .then((e) => setData(e));
  }, []);
  return data && fontsLoaded ? (
    <DataContext.Provider value={{ data, setData }}>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://i.ibb.co/6Fj0wdG/cloud.jpg",
          }}
          resizeMode="cover"
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              flex: 1,
              width: "100%",
              height: "100%",
            }}
          >
            <TopSection />
            <Hourly />
          </View>
        </ImageBackground>
      </View>
    </DataContext.Provider>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});
