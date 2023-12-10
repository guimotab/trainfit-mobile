import { View, StyleSheet, ScrollView } from "react-native"
import Exercise from "../Training/Exercise"
import HeaderTraining from "../Training/HeaderTraining"
import { IMuscleGroupInformations } from "../../../shared/interfaces/IMuscleGroupInformations"
import { cor } from "../../../utils/presetStyles"
import { ParamsProps } from "../../../@types/navigation"
import { useRoute } from "@react-navigation/native"
import { FlatList } from "react-native"
import { useEffect, useState } from "react"
import { MuscleGroup } from "../../../models/MuscleGroup"
import { Tables } from "../../../models/Tables"
import useTables from "../../../state/hooks/useTables"
import findCurrentTable from "../../../utils/findCurrentTable"
import findCurrentWorkout from "../../../utils/findCurrentWorkout"
import ErrorProgram from '../../../components/ErrorProgram'
import WarningProgram from '../../../components/WarningProgram'
import useErrorProgram from "../../../state/hooks/useErrorProgram"
import useWarningProgram from "../../../state/hooks/useWarningProgram"

const TrainingWorkout = () => {
    const tables = new Tables(useTables())
    const route = useRoute()
    const params = route.params as ParamsProps
    const id = params.id.toString()
    const date = params.date
    const [saveTable, setSaveTable] = useState(tables.tables)
    const currentTable = new MuscleGroup(findCurrentTable(saveTable, id!))
    const workout = findCurrentWorkout(currentTable, date)!
    const warningProgram = useWarningProgram()
    const errorProgram = useErrorProgram()

    return (
        <>
            <View key={workout.date} style={styles.section}>
                <HeaderTraining
                    saveTable={saveTable}
                    workout={workout}
                    setSaveTable={setSaveTable} />
                <View style={styles.viewExercise}>
                    <FlatList
                        data={workout.exercise}
                        renderItem={({ item, index }) =>
                            <Exercise
                                key={index}
                                exercise={item}
                                workout={workout}
                                saveTable={saveTable}
                                setSaveTable={setSaveTable}
                            />
                        }
                    />
                </View>
            </View>
            <WarningProgram text={warningProgram} saveTable={saveTable} setSaveTable={setSaveTable} />
            <ErrorProgram text={errorProgram} />
        </>
    )
}
const styles = StyleSheet.create({
    section: {
        //"flex flex-col bg-gray-700 rounded-2xl px-7 py-4 gap-3"
        display: "flex",
        flex: 1,
        flexDirection: "column",
        backgroundColor: cor.gray900,
        gap: 28,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    viewExercise: {
        flex: 1,
        borderRadius: 7,
        //'flex flex-col gap-5'
        display: "flex",
        flexDirection: "column",
        gap: 20
    }
});
export default TrainingWorkout