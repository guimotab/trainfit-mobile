import Sets from "./Sets"
import { Exercise as ExerciseClass } from "../../../../models/Exercise"
import { IMuscleGroupInformations } from "../../../../shared/interfaces/IMuscleGroupInformations"
import { ISets } from "../../../../shared/interfaces/ISets"
import { MuscleGroupInformation } from "../../../../models/MuscleGroupInformation"
import { MuscleGroup } from "../../../../models/MuscleGroup"
import useTables from "../../../../state/hooks/useTables"
import findCurrentTable from "../../../../utils/findCurrentTable"
import { Tables } from "../../../../models/Tables"
import { useUpdateTables } from "../../../../state/hooks/useUpdateTables"
import { AsyncStorager } from "../../../../service/AsyncStorager"
import { IExercise } from "../../../../shared/interfaces/IExercise"
import { useEffect, useState } from "react"
import { IMuscleGroup } from "../../../../shared/interfaces/IMuscleGroup"
import useWarningProgram from "../../../../state/hooks/useWarningProgram"
import { useRoute } from "@react-navigation/native"
import { ParamsProps } from "../../../../@types/navigation"
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput } from "react-native"
import { cor, font } from "../../../../utils/presetStyles"
import Edit from "react-native-vector-icons/MaterialIcons"
import Plus from "react-native-vector-icons/MaterialIcons"
import { FlatList } from "react-native"
import { useUpdateIdExerciseEdit } from "../../../../state/hooks/useUpdateIdExerciseEdit"

interface ExerciseProps {
    exercise: IExercise
    workout: IMuscleGroupInformations
    saveTable: IMuscleGroup[]
    setSaveTable: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
}

const Exercise = ({ exercise, workout, saveTable, setSaveTable }: ExerciseProps) => {
    const route = useRoute()
    const params = route.params as ParamsProps
    const id = params.id.toString()
    const tables = new Tables(useTables())
    const saveTables = new Tables(saveTable)
    const setTables = useUpdateTables()
    const [nameExercise, setNameExercise] = useState(exercise.name)
    const currentTable = new MuscleGroup(findCurrentTable(saveTables.tables, id!))
    const warningProgram = useWarningProgram()
    const setIdExerciseEdit = useUpdateIdExerciseEdit()
    useEffect(() => {
        setNameExercise(exercise.name)
    }, [exercise])

    function createNewSet() {
        if (warningProgram[0] === "") {
            const newExercise = new ExerciseClass(exercise)
            const newWorkout = new MuscleGroupInformation(workout)
            const newSet = {
                advancedTechnique: "Normal",
                numberSet: newExercise.highestNumberSet() + 1,
                observations: "",
                repetitions: 0,
                typeWeight: "Kg",
                weight: 0
            } as ISets
            newExercise.createSets(newSet)
            newWorkout.updateExercise(newExercise.name, newExercise.returnExercise())
            currentTable.updateInformations(workout.date, newWorkout.returnInformation())
            tables.updateTables(currentTable)
            setTables(tables.tables)
            setSaveTable(tables.tables)
            AsyncStorager.saveTables(tables.tables)
        }
    }
    return (
        <View style={styles.section}>
            <View style={styles.viewExercise}>
                <Edit name="edit" size={21} onPress={event => setIdExerciseEdit(exercise.name)} style={styles.icon} />
                <Text style={styles.text}>{nameExercise}</Text>
                <Pressable style={styles.pressableAdd} onPress={event => createNewSet()}>
                    <Plus name={"add-box"} size={19} style={styles.icon} />
                    <Text style={{ color: cor.gray200, fontWeight: font.medium, fontSize: 15 }}>Série</Text>
                </Pressable>
            </View>
            <FlatList
                style={{ gap: 15 }}
                data={exercise.sets}
                renderItem={({ item, index }) =>
                    <Sets
                        key={item.numberSet}
                        sets={item}
                        exercise={exercise} workout={workout}
                        saveTable={saveTable}
                        setSaveTable={setSaveTable}
                    />
                }
            />
        </View>
    )
}
const styles = StyleSheet.create({
    section: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        gap: 12,
        backgroundColor: cor.gray800,
        borderRadius: 7,
        paddingVertical: 15,
        paddingHorizontal: 22,
        marginBottom: 10,
    },
    viewExercise: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: 16
    },
    pressableAdd: {
        gap: 7,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 13,
        paddingVertical: 5,
        backgroundColor: cor.secundaria,
        borderRadius: 7

    },
    icon: {
        // w-5 h-5
        color: cor.gray200, //200,
        //hover: animate - hoverWH'
    },
    text: {
        fontWeight: font.semibold,
        fontSize: 17,
        color: cor.gray200,
        flex: 1,
    },
});

export default Exercise