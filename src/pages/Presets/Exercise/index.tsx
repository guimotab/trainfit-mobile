import { useState } from "react"
import { IPreferencesWorkout } from "../../../shared/interfaces/IPreferencesWorkout"
import { PreferencesWorkout } from "../../../models/PreferencesWorkout"
import { useUpdateMessageProgram } from "../../../state/hooks/useUpdateMessageProgram"
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native"
import Trash from "react-native-vector-icons/FontAwesome5"
import { cor, font } from "../../../utils/presetStyles"

interface ExerciseProps {
    exercise: string
    preference: IPreferencesWorkout
    savePreferences: IPreferencesWorkout[]
    setSavePreferences: React.Dispatch<React.SetStateAction<IPreferencesWorkout[]>>

}
const Exercise = ({ exercise, savePreferences, preference, setSavePreferences }: ExerciseProps) => {
    const [baseExercise, setBaseExercise] = useState(exercise)
    const setMessageProgram = useUpdateMessageProgram()
    function editExercise() {
        const value = baseExercise
        const findValueIquals = preference.basesExercises.find(thisExercise => thisExercise === value)
        const isThisElement = value === exercise
        if (value === "") {
            setBaseExercise(exercise)
            setMessageProgram(["O campo não pode ficar vazio!"], "error")
        } else {
            if (!findValueIquals) {
                const fakePreferences = [...savePreferences]
                const preferenceWorkout = new PreferencesWorkout(preference)
                const indexPreferences = fakePreferences.findIndex(preference => preference.nameMuscleGroup === preferenceWorkout.nameMuscleGroup)
                preferenceWorkout.updateBaseExercise(exercise, value)
                fakePreferences.splice(indexPreferences, 1, preferenceWorkout.returnPreferences())
                setSavePreferences(fakePreferences)
                setMessageProgram(["Há alterações feitas!"], "changed")
                setBaseExercise(value)
            } else if (!isThisElement) {
                setBaseExercise(exercise)
                setMessageProgram(["Esse exercício já foi criado!"], "error")
            }
        }
    }
    function deleteExercise() {
        const fakePreferences = [...savePreferences]
        const preferenceWorkout = new PreferencesWorkout(preference)
        const indexPreferences = fakePreferences.findIndex(preference => preference.nameMuscleGroup === preferenceWorkout.nameMuscleGroup)
        preferenceWorkout.deleteExercise(exercise)
        fakePreferences.splice(indexPreferences, 1, preferenceWorkout.returnPreferences())
        setMessageProgram(["Há alterações feitas!"], "changed")
        setSavePreferences(fakePreferences)
    }
    return (
        <View style={styles.section}>
            <TextInput
                id={baseExercise}
                value={baseExercise}
                onChangeText={text => setBaseExercise(text)}
                onEndEditing={event => editExercise()}
                maxLength={20}
                style={styles.inicialTextInput} />
            <Trash name="trash" onPress={event => deleteExercise()} style={styles.icon} />
        </View>
    )
}
const styles = StyleSheet.create({
    section: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    inicialTextInput: {
        width: "100%",
        color: cor.gray800,
        fontWeight: font.medium,
        borderRadius: 7,
        paddingHorizontal: 8,
        backgroundColor: cor.gray300
    },
    icon: {
        fontSize: 17,
        color: cor.gray200, //200,
    },
})
export default Exercise