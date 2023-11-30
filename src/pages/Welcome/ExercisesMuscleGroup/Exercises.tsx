import { useEffect, useState } from "react"
import { AllPreferences } from "../../../models/AllPreferences"
import { PreferencesWorkout } from "../../../models/PreferencesWorkout"
import usePreferences from "../../../state/hooks/usePreferences"
import { useUpdateMessageProgram } from "../../../state/hooks/useUpdateMessageProgram"
import { useUpdatePreferences } from "../../../state/hooks/useUpdatePreferences"
import { IPreferencesWorkout } from "../../../shared/interfaces/IPreferencesWorkout"
import Icon from "react-native-vector-icons/FontAwesome5"
import { ScrollView, Button, StyleSheet, Text, View, TextInput } from "react-native"
import { cor, font } from "../../../utils/presetStyles"

interface ExerciseseGroupProps {
    preference: IPreferencesWorkout
    exercise: string
}

const Exercises = ({ preference, exercise }: ExerciseseGroupProps) => {
    const preferences = new AllPreferences(usePreferences())
    const setPreferences = useUpdatePreferences()
    const setMessageProgram = useUpdateMessageProgram()
    const [baseExercise, setBaseExercise] = useState(preference.basesExercises)
    const [exerciseName, setExerciseName] = useState(exercise)
    useEffect(() => {
        setExerciseName(exercise)
        setBaseExercise(preference.basesExercises)
    }, [exercise])

    function editExercise() {
        const value = exerciseName
        const findValueIquals = baseExercise.find(thisExercise => thisExercise === value)
        const isThisElement = value === exercise
        if (value === "") {
            setExerciseName(exercise)
            setMessageProgram(["O campo não pode ficar vazio!"], "error")
        } else {
            if (!findValueIquals) {
                const fakePreferences = [...preferences.preferences]
                const preferenceWorkout = new PreferencesWorkout(preference)
                const indexPreferences = fakePreferences.findIndex(preference => preference.nameMuscleGroup === preferenceWorkout.nameMuscleGroup)
                preferenceWorkout.updateBaseExercise(exercise, value)
                fakePreferences.splice(indexPreferences, 1, preferenceWorkout.returnPreferences())
                setPreferences({ initializer: preferences.initializer, preferencesWorkout: fakePreferences })
                setExerciseName(value)
            } else if (!isThisElement) {
                setExerciseName(exercise)
                setMessageProgram(["Esse exercício já foi criado!"], "error")
            }
        }
    }
    function deleteMuscleGroup() {
        const fakePreferences = [...preferences.preferences]
        const preferenceWorkout = new PreferencesWorkout(preference)
        const indexPreferences = fakePreferences.findIndex(preference => preference.nameMuscleGroup === preferenceWorkout.nameMuscleGroup)
        preferenceWorkout.deleteExercise(exercise)
        fakePreferences.splice(indexPreferences, 1, preferenceWorkout.returnPreferences())
        setPreferences({ initializer: preferences.initializer, preferencesWorkout: fakePreferences })
    }
    return (
        <View key={exercise} style={styles.view}>
            <TextInput
                maxLength={30}
                value={exerciseName}
                onChangeText={text => setExerciseName(text)}
                onEndEditing={event => editExercise()}
                style={styles.input}
                 />
            <Icon name="trash" size={17} onPress={event => deleteMuscleGroup()} style={styles.icon} />
        </View>
    )
}
const styles = StyleSheet.create({
    view: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    input: {
        //" ml-3 pr-4 py-1 bg-transparent border-dashed-hover text-gray-200 text-lg"
        marginLeft: 5,
        flex: 1,
        paddingRight: 16,
        paddingVertical: 4,
        backgroundColor: "transparent",
        borderBottomWidth: 2,
        borderColor: cor.secundaria,
        borderStyle: "dashed",
        color: cor.gray200,
        fontSize: 16
    },
    icon: {
        color: cor.gray200, //200,
        //hover: animate - hoverWH'
    },
})
export default Exercises