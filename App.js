import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/dev";
import moment from "moment";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

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
          <View
            style={{
              flex: 1,
              alignItems: "center",
              padding: 20,
              marginTop: 60,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Pressable>
                <Feather name="menu" size={24} color="white" />
              </Pressable>
              <Text
                style={{
                  color: "white",
                  width: "70%",
                  textAlign: "center",
                  marginHorizontal: 32,
                  fontSize: 22,
                  width: "66%",
                }}
                numberOfLines={1}
              >
                {data.location.name}
              </Text>
              <Pressable>
                <Feather name="search" size={24} color="white" />
              </Pressable>
            </View>
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
            <Text style={{ color: "white", fontSize: 20 }}>
              {data.current.condition.text}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 32 }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 24 }}
                >
                  {data.current.humidity}%
                </Text>
                <Text style={{ color: "white", textAlign: "center" }}>
                  Humidity
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 24 }}
                >
                  {data.current.uv}
                </Text>
                <Text style={{ color: "white", textAlign: "center" }}>
                  UV index
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 24 }}
                >
                  {data.current.wind_kph}km/h
                </Text>
                <Text style={{ color: "white", textAlign: "center" }}>
                  Wind Speed
                </Text>
              </View>
            </View>
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
            <StatusBar translucent backgroundColor="transparent" />
          </View>
          <View
            style={{
              backgroundColor: "white",
              height: "35%",
              width: "100%",
              elevation: 10,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: 20,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "Nunito_700Bold",
                  fontSize: 22,
                }}
              >
                Today
              </Text>
              <Text style={{ fontSize: 18 }}>
                {moment(data.forecast.forecastday[0].date_epoch * 1000).format(
                  "ddd, MMM D"
                )}
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ paddingHorizontal: 20 }}
            >
              {data.forecast.forecastday[0].hour.map((item, index) => (
                <View
                  key={item.time_epoch}
                  style={{
                    alignItems: "center",
                    marginRight: index == 23 ? 44 : 24,
                  }}
                >
                  <Text>{item.temp_c.toFixed(1)}°C</Text>
                  <Image
                    source={{ uri: "https:" + item.condition.icon }}
                    style={{ width: 80, height: 80 }}
                  ></Image>
                  <Text>{moment(item.time_epoch * 1000).format("HH:mm")}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </View>
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
