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
import { AsyncStorager } from "../../../../service/LocalStorager"
import { IExercise } from "../../../../shared/interfaces/IExercise"
import { useEffect, useState } from "react"
import { IMuscleGroup } from "../../../../shared/interfaces/IMuscleGroup"
import { useUpdateMessageProgram } from "../../../../state/hooks/useUpdateMessageProgram"
import useWarningProgram from "../../../../state/hooks/useWarningProgram"
import { useRoute } from "@react-navigation/native"
import { ParamsProps } from "../../../../@types/navigation"
import Trash from "react-native-vector-icons/FontAwesome5"
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput } from "react-native"
import { cor, font } from "../../../../utils/presetStyles"
import Plus from "react-native-vector-icons/AntDesign"

interface ExerciseProps {
    exercise: IExercise
    workout: IMuscleGroupInformations
    setSaveTable: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
    saveTable: IMuscleGroup[]
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
    const updadeMessageProgram = useUpdateMessageProgram()
    const warningProgram = useWarningProgram()
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
    function changeNameExercise() {
        const value = nameExercise
        if (warningProgram[0] === "") {
            const findValueIquals = workout.exercise.find(thisExercise => thisExercise.name === value)
            const isThisElement = value === exercise.name
            if (value === "") {
                setNameExercise(exercise.name)
                updadeMessageProgram(["O campo não pode ficar vazio!"], "error")
            } else {
                if (!findValueIquals) {
                    const workoutClass = new MuscleGroupInformation(workout)
                    const indexExercise = workoutClass.exercise.findIndex(thisExercise => thisExercise.id === exercise.id)
                    const exerciseClass = new ExerciseClass(workoutClass.exercise[indexExercise])
                    exerciseClass.name = value
                    workoutClass.updateExercise(exercise.name, exerciseClass.returnExercise())
                    currentTable.updateInformations(workoutClass.date, workoutClass.returnInformation())
                    tables.updateTables(currentTable)
                    setTables(tables.tables)
                    setSaveTable(tables.tables)
                    AsyncStorager.saveTables(tables.tables)
                } else if (!isThisElement) {
                    setNameExercise(exercise.name)
                    updadeMessageProgram(["Esse exercício já foi criado!"], "error")
                }
            }
        }
    }
    function deleteSet() {
        const workoutClass = new MuscleGroupInformation(workout)
        workoutClass.deleteExercise(exercise.id)
        currentTable.updateInformations(workoutClass.date, workoutClass.returnInformation())
        saveTables.updateTables(currentTable)
        setSaveTable(saveTables.tables)
        updadeMessageProgram(["Há alterações feitas!"], "warning")
    }
    return (
        <View style={styles.section}>
            <View style={styles.viewExercise}>
                <Trash name="trash" size={17} onPress={event => deleteSet()} style={styles.icon} />
                <TextInput
                    value={nameExercise}
                    maxLength={20}
                    onChangeText={text => setNameExercise(text)}
                    onEndEditing={event => changeNameExercise()}
                    style={styles.textInput} />
                <Plus name={"pluscircleo"} size={23} onPress={event => createNewSet()} style={styles.icon} />
            </View>
            {exercise.sets[0] ?
                exercise.sets.map(sets => <Sets key={sets.numberSet} sets={sets} exercise={exercise} workout={workout} saveTable={saveTable}
                    setSaveTable={setSaveTable} />)
                : <></>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    section: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        gap: 12
    },
    viewExercise: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: 22
    },
    icon: {
        // w-5 h-5
        color: cor.gray200, //200,
        //hover: animate - hoverWH'
    },
    textInput: {
        backgroundColor: "transparent",
        fontWeight: font.semibold,
        fontSize: 16,
        color: cor.gray200,
        borderBottomWidth: 2,
        borderColor: cor.secundaria,
        flex: 1,
        borderStyle: "dashed"
    },
});

export default Exercise