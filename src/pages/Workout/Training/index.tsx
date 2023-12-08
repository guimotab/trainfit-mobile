import Exercise from "./Exercise"
import HeaderTraining from "./HeaderTraining"
import { IMuscleGroupInformations } from "../../../shared/interfaces/IMuscleGroupInformations"
import { IMuscleGroup } from "../../../shared/interfaces/IMuscleGroup"
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput } from "react-native"
import { cor, font } from '../../../utils/presetStyles'

interface TrainingProps {
    workout: IMuscleGroupInformations
    saveTable: IMuscleGroup[]
    setSaveTable: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
}

const Training = ({ workout, saveTable, setSaveTable }: TrainingProps) => {
    return (
        <View key={workout.date} style={styles.section}>
            <HeaderTraining workout={workout} saveTable={saveTable} setSaveTable={setSaveTable} />
            <View style={styles.viewExercise}>
                {workout.exercise.map((exercise, index) =>
                    <Exercise key={index} exercise={exercise} workout={workout} saveTable={saveTable} setSaveTable={setSaveTable} />
                )}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    section: {
        //"flex flex-col bg-gray-700 rounded-2xl px-7 py-4 gap-3"
        display: "flex",
        flexDirection: "column",
        backgroundColor: cor.gray800,
        borderRadius: 12,
        gap: 28,
        paddingVertical: 15,
        paddingHorizontal: 26,
    },
    viewExercise: {
        //'flex flex-col gap-5'
        display: "flex",
        flexDirection: "column",
        gap: 20
    }
});

export default Training