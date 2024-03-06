import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Feather, Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import React, { useEffect, useState } from "react";

const index = () => {
  const [option, setOption] = useState("Today");
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = days[new Date().getDay()];
  const fetchHabits = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_ADDRESS}:3000/habits`
      );
      if (response.status === 200) {
        setHabits(response.data);
      }
    } catch (ex) {
      console.log("Error fetching the habits", ex);
    }
  };

  const handleLongPress = (item) => {
    setSelectedHabit(item);
    setModalVisible((currentState) => !currentState);
  };

  const handleCompletionUpdate = async () => {
    try {
      const updatedCompletion = {
        ...selectedHabit.completed,
        [currentDay]: true,
      };
      const response = await axios.put(
        `http://${process.env.REACT_APP_ADDRESS}:3000/habits/${selectedHabit._id}/completed`,
        { completed: updatedCompletion }
      );
      if (response.status === 200) {
        Alert.alert(
          `The habit titled ${selectedHabit.title} updated successfully`
        );
      }
      fetchHabits();
      setModalVisible(false);
    } catch (ex) {
      console.log("Error updating the habit", ex);
    }
  };

  const filteredHabits = habits.filter((habit) => {
    return !habit.completed || !habit.completed[currentDay];
  });

  console.log(habits);
  useEffect(() => {
    fetchHabits();
  }, []);
  return (
    <>
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
        {option === "Today" &&
          (habits.length > 0 ? (
            <View>
              {filteredHabits.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    backgroundColor: item.color,
                    marginTop: 20,
                    borderRadius: 20,
                    padding: 10,
                  }}
                  onLongPress={() => handleLongPress(item)}
                >
                  <Text style={styles.habitText}>{item.title}</Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <View style={{ alignItems: "center" }}>
              <Image
                style={{ width: 60, height: 60, resizeMode: "cover" }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/10609/10609386.png",
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                No habits are added
              </Text>
              <Pressable
                onPress={() => router.push("/home/create")}
                style={{
                  backgroundColor: "#5db2fc",
                  width: "auto",
                  height: "auto",
                  padding: 10,
                  marginTop: 20,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Create
                </Text>
              </Pressable>
            </View>
          ))}
        {option === "Weekly" && (
          <View>
            {habits.map((habit, index) => (
              <Pressable
                key={index}
                style={{
                  backgroundColor: habit.color,
                  marginTop: 50,
                  borderRadius: 20,
                  padding: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.habitText}>{habit.title}</Text>
                  <Text style={styles.habitText}>{habit.repeatMode}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: 15,
                  }}
                >
                  {days.map((day, index) => {
                    const isCompleted = habit.completed && habit.completed[day];
                    return (
                      <Pressable key={index} style={{ alignItems: "center" }}>
                        <Text
                          style={{
                            color: day === currentDay ? "blue" : "white",
                            fontWeight: "bold",
                          }}
                        >
                          {day}
                        </Text>
                        {isCompleted ? (
                          <FontAwesome name="circle" size={24} color="white" />
                        ) : (
                          <Feather name="circle" size={24} color="white" />
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible((currenState) => !currenState)}
      >
        <View style={{ marginTop: 600, height: 250, width: "100%" }}>
          <View style={{ backgroundColor: "#edf1f2", height: 45, padding: 12 }}>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Choose an option
            </Text>
          </View>
          <View style={{ marginTop: 20, marginLeft: 20 }}>
            <Pressable
              onPress={handleCompletionUpdate}
              style={{ flexDirection: "row", gap: 10 }}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={26}
                color="black"
              />
              <Text style={{ fontSize: 18 }}>Mark as complete</Text>
            </Pressable>
          </View>
          <View style={{ marginTop: 20, marginLeft: 20 }}>
            <Pressable style={{ flexDirection: "row", gap: 10 }}>
              <Feather name="edit-2" size={26} color="black" />
              <Text style={{ fontSize: 18 }}>Edit</Text>
            </Pressable>
          </View>
          <View style={{ marginTop: 20, marginLeft: 20 }}>
            <Pressable style={{ flexDirection: "row", gap: 10 }}>
              <AntDesign name="delete" size={26} color="black" />
              <Text style={{ fontSize: 18 }}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
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
  habitText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
