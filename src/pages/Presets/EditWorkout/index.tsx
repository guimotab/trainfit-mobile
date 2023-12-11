import { Pressable, Button, StyleSheet, Text, View, TextInput } from "react-native"
import PresetGroup from "../PresetGroup"
import StyleIcons from "../StyleIcons"
import { useRoute } from "@react-navigation/native"
import { ParamsProps } from "../../../@types/navigation"
import { useState } from "react"
import { Tables } from "../../../models/Tables"
import useTables from "../../../state/hooks/useTables"
import { AllPreferences } from "../../../models/AllPreferences"
import usePreferences from "../../../state/hooks/usePreferences"
import { useUpdatePreferences } from "../../../state/hooks/useUpdatePreferences"
import { cor, font } from "../../../utils/presetStyles"
import { AsyncStorager } from "../../../service/AsyncStorager"
import findCurrentPreference from "../../../utils/findCurrentPreference"
import { useUpdateMessageProgram } from "../../../state/hooks/useUpdateMessageProgram"
import { useUpdateTables } from "../../../state/hooks/useUpdateTables"
import ChangedWarning from "../../../components/ChangedWarning"
import useErrorProgram from "../../../state/hooks/useErrorProgram"
import ErrorProgram from "../../../components/ErrorProgram"
import useSucessProgram from "../../../state/hooks/useSucessProgram"
import useChangedWarning from "../../../state/hooks/useChangedWarning"
import SucessProgram from "../../../components/SucessProgram"
import { MuscleGroup } from "../../../models/MuscleGroup"
import { PreferencesWorkout } from "../../../models/PreferencesWorkout"
const EditWorkout = () => {
    const erroProgram = useErrorProgram()
    const changedWarning = useChangedWarning()
    const sucessProgram = useSucessProgram()
    const route = useRoute()
    const params = route.params as ParamsProps
    const id = params.id.toString()
    const tables = new Tables(useTables())
    const setTables = useUpdateTables()
    const preferences = new AllPreferences(usePreferences())
    const setPreferences = useUpdatePreferences()
    const [savePreferences, setSavePreferences] = useState(preferences.preferences)
    const [saveTable, setSaveTable] = useState(tables.tables)
    const thereIsChange = useChangedWarning()
    const setMessageProgram = useUpdateMessageProgram()
    const saveTables = new Tables(saveTable)
    const savePreference = findCurrentPreference(savePreferences, id)
    const [valueInput, setValueInput] = useState(savePreference.nameMuscleGroup)

    function sucessAlert() {
        if (thereIsChange[0] === "") {
            setMessageProgram([""], "none")
        }
        setMessageProgram(["Treino salvo com sucesso!"], "sucess")
        setTables(saveTable)
        setPreferences({ initializer: preferences.initializer, preferencesWorkout: savePreferences })
        AsyncStorager.saveTables(saveTable)
        AsyncStorager.savePreferences({ initializer: preferences.initializer, preferencesWorkout: savePreferences })
    }
    function editNameMuscularGroup() {
        const value = valueInput
        const findValueIquals = savePreferences.find(thisExercise => thisExercise.nameMuscleGroup === value)
        const isThisElement = value === savePreference.nameMuscleGroup
        if (value === "") {
            setValueInput(savePreference.nameMuscleGroup)
            setMessageProgram(["O campo não pode ficar vazio!"], "error")
        } else {
            if (!findValueIquals) {
                //save on the table
                const indexTable = saveTables.tables.findIndex(table => table.id === savePreference.id)
                const thisTable = new MuscleGroup(saveTables.tables[indexTable])
                thisTable.name = value
                saveTables.updateTables(thisTable)
                setSaveTable(saveTables.tables)
                //save on the preferences
                const fakePreferences = [...savePreferences]
                const preferenceWorkout = new PreferencesWorkout(savePreference)
                const indexPreferences = fakePreferences.findIndex(preference => preference.nameMuscleGroup === preferenceWorkout.nameMuscleGroup)
                preferenceWorkout.nameMuscleGroup = value
                fakePreferences.splice(indexPreferences, 1, preferenceWorkout.returnPreferences())
                setSavePreferences(fakePreferences)
                setValueInput(value)
                setMessageProgram(["Há alterações feitas!"], "changed")
            } else if (!isThisElement) {
                setValueInput(savePreference.nameMuscleGroup)
                setMessageProgram(["Esse grupo muscular já foi criado!"], "error")
            }
        }
    }
    return (
        <>
            <View style={styles.sectionView}>
                <TextInput
                    maxLength={25}
                    value={valueInput}
                    onChangeText={text => setValueInput(text)}
                    onEndEditing={event => editNameMuscularGroup()}
                    style={styles.textInput} />
                <View style={{gap: 20}}>
                    <PresetGroup
                        valueInput={valueInput}
                        savePreference={savePreference}
                        savePreferences={savePreferences}
                        setSaveTable={setSaveTable}
                        setSavePreferences={setSavePreferences} />
                    <StyleIcons
                        id={id}
                        saveTable={saveTable}
                        setSaveTable={setSaveTable} />
                    <View style={styles.viewSave}>
                        <Text style={styles.button}
                            onPress={event => sucessAlert()}>
                            Salvar alterações
                        </Text>
                    </View>
                </View>
            </View>
            <ErrorProgram text={erroProgram} />
            <ChangedWarning text={changedWarning} />
            <SucessProgram text={sucessProgram} />
        </>
    )
}
const styles = StyleSheet.create({
    sectionView: {
        display: "flex",
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: cor.gray900,
    },
    viewSave: {
        display: "flex",
        color: cor.gray200,
        fontWeight: font.semibold,
        fontSize: 16,
        borderRadius: 8
    },
    textInput: {
        backgroundColor: "transparent",
        fontWeight: font.bold,
        fontSize: 21,
        marginTop: 10,
        marginRight: 80,
        paddingBottom: 3,
        color: cor.gray200,
        borderBottomWidth: 2,
        borderColor: cor.secundaria,
        borderStyle: "dashed"
    },
    button: {
        display: 'flex',
        paddingHorizontal: 13,
        paddingVertical: 8,
        borderRadius: 6,
        textAlign: "center",
        color: cor.gray200,
        fontWeight: font.semibold,
        fontSize: 17,
        backgroundColor: cor.secundaria
    },
});
export default EditWorkout

