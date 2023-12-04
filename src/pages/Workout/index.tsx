import { cor } from "../../utils/presetStyles";
import Table from "./Table";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native"

function Workout() {
  return (
    <View style={styles.screen}>
      <Table />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: cor.gray900,
    flex: 1,
    paddingVertical: 10
  },
});
export default Workout;