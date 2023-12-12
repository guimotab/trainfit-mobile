import { IMuscleGroupInformations } from "../../../shared/interfaces/IMuscleGroupInformations"
import { IMuscleGroup } from "../../../shared/interfaces/IMuscleGroup"
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput } from "react-native"
import { cor, font } from '../../../utils/presetStyles'
import { useRoute, useNavigation } from "@react-navigation/native"
import { ParamsProps } from "../../../@types/navigation"

interface TrainingProps {
    workout: IMuscleGroupInformations
}

const Training = ({ workout }: TrainingProps) => {
    const route = useRoute()
    const params = route.params as ParamsProps
    const id = params.id
    const navigation = useNavigation()
    function viewTraining() {
        navigation.navigate("TrainingWorkout", { id, date: workout.date })
    }
    return (
        <Pressable onPress={event => viewTraining()} style={styles.sectionView}>
            <Text style={styles.text}>{workout.date}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    sectionView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: cor.gray800,
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 26,
    },
    text: {
        fontWeight: font.semibold,
        color: cor.gray200,
        fontSize: 21
    },
});

export default Training