import { View, StyleSheet } from "react-native"
import Exercise from "../Training/Exercise"
import HeaderTraining from "../Training/HeaderTraining"
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
import EditExercise from "./EditExercise"
import ScreenBottom from "../../../components/ScreenBottom"
import useIdExerciseEdit from "../../../state/hooks/useIdExerciseEdit"
import { useUpdateIdExerciseEdit } from "../../../state/hooks/useUpdateIdExerciseEdit"
import useIdSetsEdit from "../../../state/hooks/useIdSetsEdit"
import { useUpdateIdSetsEdit } from "../../../state/hooks/useUpdateIdSetsEdit"
import EditSets from "./EditSets"
import WarningDeleteWorkout from "./WarningDeleteWorkout.tsx"
import StopWatch from "./StopWatch"

const TrainingWorkout = () => {
    const tables = new Tables(useTables())
    const route = useRoute()
    const params = route.params as ParamsProps
    const id = params.id.toString()
    const date = params.date
    const [saveTable, setSaveTable] = useState(tables.tables)
    const [showDeleteWorkout, setShowDeleteWorkout] = useState(false)
    const currentTable = new MuscleGroup(findCurrentTable(saveTable, id!))
    const workout = findCurrentWorkout(currentTable, date)!
    const warningProgram = useWarningProgram()
    const errorProgram = useErrorProgram()
    const idExerciseEdit = useIdExerciseEdit()
    const setIdExerciseEdit = useUpdateIdExerciseEdit()
    const idSetsEdit = useIdSetsEdit()
    const setIdSetsEdit = useUpdateIdSetsEdit()

    useEffect(() => {
        setSaveTable(tables.tables)
    }, [tables.tables])
    return (
        <>
            <WarningDeleteWorkout
                currentTable={currentTable}
                setShowWarning={setShowDeleteWorkout}
                showWarning={showDeleteWorkout}
                workout={workout} />
            <StopWatch />
            <View key={workout.date} style={styles.section}>
                <HeaderTraining
                    saveTable={saveTable}
                    workout={workout}
                    setShowDeleteWorkout={setShowDeleteWorkout}
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
            <ScreenBottom
                showEdit={idExerciseEdit}
                setShowEdit={setIdExerciseEdit}>
                <EditExercise
                    currentTable={currentTable}
                    workout={workout}
                    saveTable={saveTable}
                    setSaveTable={setSaveTable} />
            </ScreenBottom>
            <ScreenBottom
                showEdit={idSetsEdit}
                setShowEdit={setIdSetsEdit}>
                <EditSets
                    currentTable={currentTable}
                    workout={workout}
                    saveTable={saveTable}
                    setSaveTable={setSaveTable} />
            </ScreenBottom>
            <WarningProgram text={warningProgram}
                saveTable={saveTable}
                setSaveTable={setSaveTable} />
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