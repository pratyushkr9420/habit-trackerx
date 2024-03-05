import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

const ColorSquare = ({ color, size }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        margin: 5,
        marginLeft: 20,
      }}
    />
  );
};
const ColorSquareWithPlus = ({ color, size }) => {
  return (
    <Pressable onPress={() => setSelectedColor(color)}>
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          margin: 5,
          marginLeft: 20,
        }}
      />
      <Text
        style={{
          position: "absolute",
          top: 4,
          left: 26,
          color: "white",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        +
      </Text>
    </Pressable>
  );
};

const DaySquare = ({ day, size }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: "#e6ebeb",
        padding: 4,
        margin: 5,
      }}
    >
      <Pressable>
        <Text style={{ textAlign: "center", fontWeight: "400" }}>{day}</Text>
      </Pressable>
    </View>
  );
};
const create = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [title, setTitle] = useState("");
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const reminderToggle = () => {
    setIsReminderEnabled((previousState) => !previousState);
  };
  const router = useRouter();
  const colors = [
    "#FF5733", // Red
    "#FFD700", // Gold
    "#5D76A9",
    "#1877F2", // Medium Purple
    "#32CD32", // Lime Green
    "#CCCCFF", // Tomato
    "#4169E1", // Royal Blue
  ];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const addHabit = async () => {
    try {
      const newHabit = {
        title: title,
        color: selectedColor,
        repeatFrequency: "Daily",
        reminder: false,
      };
      const response = await axios.post(
        `http://${process.env.REACT_APP_ADDRESS}:3000/habits`,
        newHabit
      );
      if (response.status == 200) {
        setTitle("");
        Alert.alert("Habit has been added successfuly");
        console.log("habit added", response);
      }
    } catch (ex) {
      console.log("Error adding the habit", ex);
    }
  };

  return (
    <View style={styles.habitContainer}>
      <Pressable onPress={() => router.push("/home")}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </Pressable>
      <Text style={styles.habitTitleText}>Create Habit</Text>
      <TextInput
        onChangeText={(text) => setTitle(text)}
        value={title}
        style={styles.habitEntry}
        placeholder="Add a habit"
      />
      <View style={{ margin: 8 }}>
        <Text style={styles.habitTitleText}>Color</Text>
        <View style={styles.colorContainer}>
          {colors.map((item, index) =>
            selectedColor === item ? (
              <Pressable>
                <ColorSquareWithPlus key={index} color={item} size={24} />
              </Pressable>
            ) : (
              <Pressable onPress={() => setSelectedColor(item)}>
                <ColorSquare key={index} color={item} size={24} />
              </Pressable>
            )
          )}
        </View>
      </View>
      <View style={{ margin: 8 }}>
        <Text style={styles.habitTitleText}>Repeats</Text>
        <View style={styles.repeatsContainer}>
          <Pressable style={styles.repeatPresable}>
            <Text style={styles.habitFrequencyText}>Weekly</Text>
          </Pressable>
          <Pressable style={styles.repeatPresable}>
            <Text style={styles.habitFrequencyText}>Daily</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ margin: 8 }}>
        <Text style={styles.habitTitleText}>On these days</Text>
        <View style={styles.daysContainer}>
          {days.map((item, index) => (
            <DaySquare day={item} key={index} size={30} />
          ))}
        </View>
      </View>
      <View style={{ margin: 8 }}>
        <View style={styles.subOptionContainer}>
          <Text style={styles.habitTitleText}>Reminder</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isReminderEnabled ? "blue" : "#cde5fa"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={reminderToggle}
            value={isReminderEnabled}
          />
        </View>
      </View>
      <Pressable
        style={{
          marginTop: 10,
          backgroundColor: "#0252a8",
          borderRadius: "20",
          width: "98%",
          height: 40,
          padding: 8,
        }}
        onPress={addHabit}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          SAVE
        </Text>
      </Pressable>
    </View>
  );
};

export default create;

const styles = StyleSheet.create({
  habitContainer: {
    padding: 10,
  },
  habitTitleText: {
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 10,
    margin: 15,
  },
  habitEntry: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#cde5fa",
    borderRadius: 20,
    height: 50,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  colorContainer: {
    marginTop: 20,
    flexDirection: "row",
    gap: 6,
    padding: 0,
  },
  repeatsContainer: {
    marginTop: 20,
    flexDirection: "row",
    gap: 20,
  },
  repeatPresable: {
    backgroundColor: "#cde5fa",
    flex: 1,
    padding: 10,
    borderRadius: 20,
  },
  habitFrequencyText: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "400",
  },
  daysContainer: {
    flexDirection: "row",
    gap: 18,
    alignItems: "center",
    marginTop: 20,
  },
  subOptionContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
