import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import TicTacToe from "./components/TicTacToe";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gameContainer}>
        <TicTacToe />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  gameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
