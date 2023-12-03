import { IPreferencesWorkout } from "../../../shared/interfaces/IPreferencesWorkout"
import Exercises from "./Exercises"
import { PreferencesWorkout } from "../../../models/PreferencesWorkout"
import { AllPreferences } from "../../../models/AllPreferences"
import usePreferences from "../../../state/hooks/usePreferences"
import { useUpdatePreferences } from "../../../state/hooks/useUpdatePreferences"
import { useState } from "react"
import { useUpdateMessageProgram } from "../../../state/hooks/useUpdateMessageProgram"
import Icon from "react-native-vector-icons/AntDesign"
import { ScrollView, Button, StyleSheet, Text, View, TextInput } from "react-native"
import { cor, font } from "../../../utils/presetStyles"

interface ExercisesMuscleGroupProps {
    preference: IPreferencesWorkout
}

const ExercisesMuscleGroup = ({ preference }: ExercisesMuscleGroupProps) => {
    const preferences = new AllPreferences(usePreferences())
    const setPreferences = useUpdatePreferences()
    const setMessageProgram = useUpdateMessageProgram()
    const [newExercise, setNewExercise] = useState(false)
    const [name, setName] = useState("")

    function saveNewExercise() {
        const value = name
        const findValueIquals = preference.basesExercises.find(thisExercise => thisExercise === value)
        const isThisElement = value === preference.nameMuscleGroup
        if (value === "") {
            setMessageProgram(["O campo não pode ficar vazio!"], "error")
        } else if (!findValueIquals) {
            //save on the preferences
            const preferenceWorkout = new PreferencesWorkout(preference)
            const fakeBase = [...preference.basesExercises]
            fakeBase.push(value)
            preferenceWorkout.basesExercises = [...fakeBase]
            const fakePreferences = [...preferences.preferences]
            const findIndexPreference = fakePreferences.findIndex(thisPreference => thisPreference.nameMuscleGroup === preference.nameMuscleGroup)
            fakePreferences.splice(findIndexPreference, 1, preferenceWorkout.returnPreferences())
            setPreferences({ initializer: preferences.initializer, preferencesWorkout: fakePreferences })
        } else if (!isThisElement) {
            setMessageProgram(["Esse exercício já foi criado!"], "error")
        }
        setNewExercise(false)
        setName("")
    }
    return (
        <View style={styles.section}>
            <View style={styles.sectionView}>
                <View style={styles.titleGroup}>
                    <Text style={styles.text} >
                        {preference.nameMuscleGroup}
                    </Text>
                    <Icon name={"pluscircleo"} size={23} onPress={event => setNewExercise(true)} style={styles.icon} />
                </View>
                <View style={styles.divExerciseInput}>
                    {preference.basesExercises.map(exercise =>
                        <Exercises key={exercise} preference={preference} exercise={exercise} />
                    )}
                    {newExercise ?
                        <TextInput
                            value={name}
                            style={styles.input}
                            autoFocus
                            onChangeText={text => setName(text)}
                            onEndEditing={event => saveNewExercise()}
                        />
                        : <></>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        display: "flex",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    sectionView: {
        display: "flex",
        flexDirection: "column",
        borderWidth: 2,
        borderColor: cor.secundaria,
        borderRadius: 10,
        paddingHorizontal: 24,
        paddingVertical: 8,
        gap: 12
    },
    titleGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    text: {
        paddingHorizontal: 4,
        backgroundColor: "transparent",
        color: cor.gray200,
        fontWeight: font.medium,
        fontSize: 20
    },
    divExerciseInput: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        paddingBottom: 12
    },
    input: {
        paddingHorizontal:10,
        color: cor.gray800,
        fontWeight: font.medium,
        fontSize: 16,
        borderRadius: 5,
        backgroundColor: cor.gray300
    },
    icon: {
        color: cor.gray200, //200,
        //hover: animate - hoverWH'
    },
})
export default ExercisesMuscleGroup