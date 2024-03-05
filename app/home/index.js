import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";

const index = () => {
  const [option, setOption] = useState("Today");
  const router = useRouter();
  return (
    <ScrollView style={styles.homeContainer}>
      <View style={styles.homeTopTab}>
        <MaterialIcons name="self-improvement" size={40} color="black" />
        <Feather
          onPress={() => router.push("/home/create")}
          name="plus-circle"
          size={30}
          color="black"
        />
      </View>
      <Text style={styles.titleText}>Habits</Text>
      <View style={styles.statusContainer}>
        <Pressable
          onPress={() => setOption("Today")}
          style={{
            backgroundColor: option === "Today" ? "#5db2fc" : "transparent",
            marginTop: 20,
            paddingHorizontal: 12,
            paddingVertical: 12,
            borderRadius: "50%",
          }}
        >
          <Text style={styles.textInPresable}>Today</Text>
        </Pressable>
        <Pressable
          onPress={() => setOption("Weekly")}
          style={{
            backgroundColor: option === "Weekly" ? "#5db2fc" : "transparent",
            marginTop: 20,
            paddingHorizontal: 12,
            paddingVertical: 12,
            borderRadius: "50%",
          }}
        >
          <Text style={styles.textInPresable}>Weekly</Text>
        </Pressable>
        <Pressable
          onPress={() => setOption("Overall")}
          style={{
            backgroundColor: option === "Overall" ? "#5db2fc" : "transparent",
            marginTop: 20,
            paddingHorizontal: 12,
            paddingVertical: 12,
            borderRadius: "50%",
          }}
        >
          <Text style={styles.textInPresable}>Overall</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  homeContainer: {
    padding: 10,
    backgroundColor: "white",
    flex: 1,
  },
  homeTopTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
  textInPresable: {
    textAlign: "center",
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
});
