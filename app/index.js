import { StyleSheet, Text, View } from "react-native";
import { Redirect } from "expo-router";
import React from "react";

const index = () => {
  return <Redirect href="/home" />;
};

export default index;

const styles = StyleSheet.create({});

// -> '/'This is the initial route
