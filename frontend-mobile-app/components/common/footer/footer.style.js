import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#2D1461",
    height: 55,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    color: "white",
    fontSize: 12,
  },
  selectedText: {
    color: "orange",
  },
});

export default styles;
