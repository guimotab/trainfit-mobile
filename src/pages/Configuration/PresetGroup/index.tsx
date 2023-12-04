import { Tables } from "../../../models/Tables"
import useTables from "../../../state/hooks/useTables"
import usePreferences from "../../../state/hooks/usePreferences"
import MuscularGroup from "../MuscularGroup"
import useErrorProgram from "../../../state/hooks/useErrorProgram"
import ErrorProgram from "../../../components/ErrorProgram"
import { AsyncStorager } from "../../../service/LocalStorager"
import { useUpdatePreferences } from "../../../state/hooks/useUpdatePreferences"
import { IPreferencesWorkout } from "../../../shared/interfaces/IPreferencesWorkout"
import { useUpdateTables } from "../../../state/hooks/useUpdateTables"
import SucessProgram from "../../../components/SucessProgram"
import useSucessProgram from "../../../state/hooks/useSucessProgram"
import { useState } from "react"
import { StyleSheet, Text, View, Pressable } from "react-native"
import { useUpdateMessageProgram } from "../../../state/hooks/useUpdateMessageProgram"
import { AllPreferences } from "../../../models/AllPreferences"
import { cor, font } from "../../../utils/presetStyles"

const PresetGroup = () => {
    const preferences = new AllPreferences(usePreferences())
    const setPreferences = useUpdatePreferences()
    const setMessageProgram = useUpdateMessageProgram()
    const tables = new Tables(useTables())
    const setTables = useUpdateTables()
    const [saveTable, setSaveTable] = useState(tables.tables)
    const [savePreferences, setSavePreferences] = useState(preferences.preferences)
    
    function addNewMuscularGroup() {
        const saveTables = new Tables(saveTable)
        let newId: number
        if (saveTables.tables[0]) {
            newId = saveTables.tables[saveTables.tables.length - 1].id + 1
        } else {
            newId = 1
        }
        const newPreference = {
            id: newId,
            nameMuscleGroup: "Novo Grupo " + newId,
            basesExercises: []
        } as IPreferencesWorkout
        saveTables.addNewTable(newPreference.id, newPreference.nameMuscleGroup, [])
        const fakePreferences = [...savePreferences]
        fakePreferences.push(newPreference)
        setSavePreferences(fakePreferences)
        setSaveTable(saveTables.tables)
    }
    function sucessAlert() {
        setMessageProgram(["Treinos salvos com sucesso!"], "sucess")
        setTables(saveTable)
        setPreferences({ initializer: preferences.initializer, preferencesWorkout: savePreferences })
        AsyncStorager.saveTables(saveTable)
        AsyncStorager.savePreferences({ initializer: preferences.initializer, preferencesWorkout: savePreferences })
    }
    return (
        < View style={styles.sectionView} >
            <View style={styles.textGroup}>
                <Text style={styles.textTrain}>Predefinição dos Treinos</Text>
                <Text
                    onPress={event => addNewMuscularGroup()}
                    style={styles.buttonAdd}>Criar novo</Text>
            </View>
            <View style={styles.viewSave}>
                <Text style={styles.buttonSave}
                    onPress={event => sucessAlert()}>
                    Salvar alterações
                </Text>
            </View>
            <View style={styles.viewMuscularGroup}>
                {savePreferences.map(preference =>
                    <MuscularGroup
                        key={preference.nameMuscleGroup}
                        preference={preference}
                        savePreferences={savePreferences}
                        saveTable={saveTable}
                        setSaveTable={setSaveTable}
                        setSavePreferences={setSavePreferences} />
                ).reverse()}
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    sectionView: {
        display: "flex",
        flexDirection: "column",
        marginTop: 15,
        gap: 20,
    },
    textGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textTrain: {
        fontWeight: font.bold,
        fontSize: 20,
        color: cor.gray200
    },
    buttonAdd: {
        fontWeight: font.semibold,
        fontSize: 16,
        paddingHorizontal: 13,
        paddingVertical: 4,
        color: cor.gray200,
        borderRadius: 6,
        backgroundColor: cor.secundaria
    },
    viewMuscularGroup: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 30
    },
    viewSave: {
        display: "flex",
        alignItems: "flex-start",
        color: cor.gray200,
        fontWeight: font.semibold,
        fontSize: 16,
        borderRadius: 8
    },
    buttonSave: {
        fontWeight: font.semibold,
        fontSize: 15,
        paddingHorizontal: 13,
        paddingVertical: 6,
        color: cor.gray200,
        borderRadius: 6,
        backgroundColor: cor.secundaria
    },

});
export default PresetGroup