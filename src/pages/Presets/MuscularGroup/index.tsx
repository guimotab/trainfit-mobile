import { IPreferencesWorkout } from "../../../shared/interfaces/IPreferencesWorkout"
import Exercise from "../Exercise"
import { useState } from "react"
import { PreferencesWorkout } from "../../../models/PreferencesWorkout"
import { Tables } from "../../../models/Tables"
import { MuscleGroup } from "../../../models/MuscleGroup"
import { IMuscleGroup } from "../../../shared/interfaces/IMuscleGroup"
import { useUpdateMessageProgram } from "../../../state/hooks/useUpdateMessageProgram"
import AddGroup from "react-native-vector-icons/MaterialIcons"
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native"
import { cor, font } from "../../../utils/presetStyles"
import useChangedWarning from "../../../state/hooks/useChangedWarning"
import { FlatList } from "react-native"
interface MuscularGroupProps {
    valueInput: string
    preference: IPreferencesWorkout
    savePreferences: IPreferencesWorkout[]
    setSavePreferences: React.Dispatch<React.SetStateAction<IPreferencesWorkout[]>>
}
const MuscularGroup = ({ valueInput, preference, savePreferences, setSavePreferences }: MuscularGroupProps) => {
    const [createNewExercise, setCreateNewExercise] = useState(false)
    const [valueInicialInput, setValueInicialInput] = useState("")
    const setMessageProgram = useUpdateMessageProgram()
    const thereIsChange = useChangedWarning()

    function saveNewExercise() {
        const value = valueInicialInput
        const findThisPreference = savePreferences.findIndex(preference => preference.nameMuscleGroup === valueInput)
        const findValueIquals = savePreferences[findThisPreference].basesExercises.find(thisExercise => thisExercise === value)
        const isThisElement = value === preference.nameMuscleGroup
        if (value === "") {
            setMessageProgram(["O campo não pode ficar vazio!"], "error")
        } else if (!findValueIquals) {
            //save on the preferences
            const preferenceWorkout = new PreferencesWorkout(preference)
            const fakeBase = [...preference.basesExercises]
            fakeBase.push(value)
            preferenceWorkout.basesExercises = [...fakeBase]
            const fakePreferences = [...savePreferences]
            const findIndexPreference = fakePreferences.findIndex(thisPreference => thisPreference.nameMuscleGroup === preference.nameMuscleGroup)
            fakePreferences.splice(findIndexPreference, 1, preferenceWorkout.returnPreferences())
            setSavePreferences(fakePreferences)
            setMessageProgram(["Há alterações feitas!"], "changed")

        } else if (!isThisElement) {
            setMessageProgram(["Esse grupo muscular já foi criado!"], "error")
        }
        setCreateNewExercise(false)
        setValueInicialInput("")
    }
    function addNewExercise() {
        setCreateNewExercise(true)
    }
    return (
        <View style={styles.section}>
            <View style={styles.sectionView}>
                <View style={styles.firstGroup}>
                    <Pressable onPress={event => addNewExercise()} style={styles.createGroup}>
                        <AddGroup name="my-library-add" style={styles.icon} /><Text style={styles.textButton}>Adicionar</Text>
                    </Pressable>
                </View>
                <View style={styles.exercisesGroup}>
                    {preference.basesExercises.map(exercise =>
                        <Exercise
                            key={exercise}
                            exercise={exercise}
                            preference={preference}
                            savePreferences={savePreferences}
                            setSavePreferences={setSavePreferences} />
                    )}
                    {createNewExercise ?
                        <TextInput
                            value={valueInicialInput}
                            style={styles.inicialTextInput}
                            autoFocus
                            onChangeText={text => setValueInicialInput(text)}
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
        backgroundColor: cor.gray800,
        borderRadius: 7,
        width: "100%",
        paddingVertical: 10
    },
    sectionView: {
        display: "flex",
        flexDirection: "column",
        gap: 12
    },
    firstGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 14,
        justifyContent: "space-between"
    },
    textPlusGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    exercisesGroup: {
        display: "flex",
        flexDirection: "column",
        width: "85%",
        paddingHorizontal: 20,
        gap: 16,
        paddingBottom: 5
    },
    inicialTextInput: {
        width: "100%",
        color: cor.gray800,
        fontWeight: font.medium,
        borderRadius: 7,
        paddingHorizontal: 8,
        backgroundColor: cor.gray300
    },
    createGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        backgroundColor: cor.secundaria,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 7
    },
    textButton: {
        color: cor.gray200,
        fontWeight: font.semibold,
        fontSize: 15
    },
    icon: {
        color: cor.gray200,
        fontSize: 19
    }
})
export default MuscularGroup