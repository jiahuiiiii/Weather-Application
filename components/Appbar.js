import {
  View,
  Text,
  Pressable,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../App";
import { MotiView } from "moti";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Appbar = () => {
  const { data } = useContext(DataContext);
  const [searchBarOpen, setSearchBarOpen] = useState(true);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: 28,
      }}
    >
      {!searchBarOpen && (
        <Text
          style={{
            color: "white",
            textAlign: "left",
            marginRight: 32,
            fontSize: 22,
          }}
          numberOfLines={1}
        >
          {data.location.name}
        </Text>
      )}
      <Pressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setSearchBarOpen(!searchBarOpen);
        }}
      >
        <Feather name="search" size={24} color="white" />
      </Pressable>
      {searchBarOpen && (
        <TextInput
          selectionColor={"white"}
          placeholder="search location"
          placeholderTextColor="#d1d5db"
          style={{
            flex: 1,
            color: "white",
            marginLeft: 20,
            fontSize: 18,
            fontFamily: "Nunito_500Medium",
          }}
        />
      )}
    </View>
  );
};

export default Appbar;
