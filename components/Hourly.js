import { View, Text, ScrollView } from "react-native";
import React from "react";
import * as Icons from "../assets/svg";
import moment from "moment";
import { useContext } from "react";
import { DataContext } from "../App";
import iconMap from "../assets/iconMap.json";
import { MotiView } from "moti";

const Hourly = () => {
  const { data } = useContext(DataContext);

  return (
    <MotiView
      from={{
        scale: 0,
        translateX: -10,
      }}
      animate={{
        scale: 1,
        translateX: 0,
      }}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        height: "35%",
        width: "100%",
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
        style={{ paddingHorizontal: 20, height: 100 }}
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
            {(() => {
              const icon =
                iconMap[
                  iconMap.findIndex((i) => item.condition.code === i.code)
                ][item.is_day ? "dayIcon" : "nightIcon"];
              //convert icon name to camel case
              const iconName = icon.replace(/-([a-z])/g, (g) =>
                g[1].toUpperCase()
              );
              const Icon = Icons[iconName];
              return <Icon width="64" height="64" />;
            })()}
            <Text>{moment(item.time_epoch * 1000).format("HH:mm")}</Text>
          </View>
        ))}
      </ScrollView>
    </MotiView>
  );
};

export default Hourly;
