import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { cor, font } from "../../../../utils/presetStyles";
import { MuscleGroup } from "../../../../models/MuscleGroup";
import useIdExerciseEdit from "../../../../state/hooks/useIdExerciseEdit";
import { useState } from "react";
import { MuscleGroupInformation } from "../../../../models/MuscleGroupInformation";
import { Tables } from "../../../../models/Tables";
import { AsyncStorager } from "../../../../service/AsyncStorager";
import useTables from "../../../../state/hooks/useTables";
import { Exercise as ExerciseClass } from "../../../../models/Exercise"
import { useUpdateTables } from "../../../../state/hooks/useUpdateTables";
import { IMuscleGroupInformations } from "../../../../shared/interfaces/IMuscleGroupInformations";
import { useUpdateIdExerciseEdit } from "../../../../state/hooks/useUpdateIdExerciseEdit";
import Trash from "react-native-vector-icons/FontAwesome5"
import Check from "react-native-vector-icons/FontAwesome5"
import { useUpdateMessageProgram } from "../../../../state/hooks/useUpdateMessageProgram";
import { IMuscleGroup } from "../../../../shared/interfaces/IMuscleGroup";
interface EditExerciseProps {
    currentTable: MuscleGroup
    workout: IMuscleGroupInformations
    saveTable: IMuscleGroup[]
    setSaveTable: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
}
const EditExercise = ({ saveTable, currentTable, workout, setSaveTable }: EditExerciseProps) => {
    const idExercise = useIdExerciseEdit()
    const setIdExerciseEdit = useUpdateIdExerciseEdit()
    const saveTables = new Tables(saveTable)
    const tables = new Tables(useTables())
    const [nameExercise, setNameExercise] = useState(idExercise)
    const [stringError, setStringError] = useState("")
    const setTables = useUpdateTables()
    const updadeMessageProgram = useUpdateMessageProgram()
    function changeNameExercise() {
        if (idExercise !== nameExercise) {
            const findValueIquals = workout.exercise.find(thisExercise => thisExercise.name === nameExercise)
            const isThisElement = nameExercise === idExercise
            if (nameExercise === "") {
                setNameExercise(idExercise)
                setStringError("O campo não pode ficar vazio!")
            } else {
                if (!findValueIquals) {
                    const workoutClass = new MuscleGroupInformation(workout)
                    const indexExercise = workoutClass.exercise.findIndex(thisExercise => thisExercise.name === idExercise)
                    const exerciseClass = new ExerciseClass(workoutClass.exercise[indexExercise])
                    exerciseClass.name = nameExercise
                    workoutClass.updateExercise(idExercise, exerciseClass.returnExercise())
                    currentTable.updateInformations(workoutClass.date, workoutClass.returnInformation())
                    tables.updateTables(currentTable)
                    setTables(tables.tables)
                    AsyncStorager.saveTables(tables.tables)
                    setStringError("")
                    setIdExerciseEdit(nameExercise)
                } else if (!isThisElement) {
                    setNameExercise(idExercise)
                    setStringError("Esse exercício já foi criado!")
                }
            }
        }
    }
    function deleteSet() {
        const workoutClass = new MuscleGroupInformation(workout)
        workoutClass.deleteExerciseByName(idExercise)
        currentTable.updateInformations(workoutClass.date, workoutClass.returnInformation())
        saveTables.updateTables(currentTable)
        setSaveTable(saveTables.tables)
        updadeMessageProgram(["Há alterações feitas!"], "warning")
        setIdExerciseEdit("")
    }
    return (
        <View style={styles.section}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
                    <Text style={styles.textEdit}>Editar exercício</Text>
                    <Pressable style={idExercise === nameExercise ? styles.pressableSave : styles.pressableSaveChanged} onPress={event => changeNameExercise()}>
                        <Check name="check" size={16} style={styles.icon} />
                        <Text style={{ color: cor.gray200, fontSize: 15, fontWeight: font.semibold }}>Salvar</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.pressableExclude} onPress={event => deleteSet()}>
                    <Trash name="trash" size={16} style={styles.icon} />
                    <Text style={{ color: cor.gray200, fontSize: 15, fontWeight: font.semibold }}>Excluir</Text>
                </Pressable>
            </View>
            <View style={styles.viewSection}>
                <TextInput
                    value={nameExercise}
                    maxLength={20}
                    onChangeText={text => setNameExercise(text)}
                    style={styles.textInput} />
                {stringError !== "" ?
                    <Text style={styles.textError}>{stringError}</Text>
                    : ""
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    section: {
        zIndex: 30,
        gap: 15,
        display: "flex",
        justifyContent: "center",
        paddingBottom: 30,
        paddingTop: 8,
    },
    viewSection: {
        paddingLeft: 15,
        gap: 2,
        width: 300,
    },
    textEdit: {
        color: cor.gray200,
        fontSize: 17,
        fontWeight: font.medium
    },
    pressableSave: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        backgroundColor: cor.gray500,
        borderRadius: 7,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    pressableSaveChanged: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        backgroundColor: cor.secundaria,
        borderRadius: 7,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    pressableExclude: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        backgroundColor: cor.deleteHover,
        borderRadius: 7,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    textInput: {
        backgroundColor: "transparent",
        fontWeight: font.semibold,
        fontSize: 21,
        width: "100%",
        color: cor.gray200,
        borderBottomWidth: 2,
        borderColor: cor.secundaria,
        borderStyle: "dashed"
    },
    textError: {
        position: "absolute",
        paddingHorizontal: 15,
        bottom: -18,
        color: cor.erro,
        fontSize: 14,
        fontWeight: font.medium
    },
    icon: {
        color: cor.gray200, //200,
    },
});
export default EditExercise