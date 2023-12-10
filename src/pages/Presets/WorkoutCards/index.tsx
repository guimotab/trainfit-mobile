
import { Pressable, Button, StyleSheet, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { IMuscleGroup } from "../../../shared/interfaces/IMuscleGroup"
import { cor } from "../../../utils/presetStyles"
interface WorkoutCardsProps {
    table: IMuscleGroup
}

const WorkoutCards = ({ table }: WorkoutCardsProps) => {
    const navigation = useNavigation()
    return (
        <Pressable
            id={`border-link-workout${table.id}`}
            style={styles.pressable}
            onPress={event => navigation.navigate("EditWorkout", { id: table.id })}>
            <View style={styles.pressableView}>
                <Text style={styles.text}>{table.name}</Text>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    pressable: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        width: "47%",
        height: 100,
        color: cor.gray200,//200
        backgroundColor: cor.gray800,
        padding: 11
    },
    pressableView: {
        display: "flex",
        flex: 1,
        height: "100%",
        gap: 10,
        borderColor: cor.gray300,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 2,
    },
    text: {
        fontSize: 17,
        textAlign: "center",
        fontWeight: "600",
        color: cor.gray200, //200
    },
});
export default WorkoutCards