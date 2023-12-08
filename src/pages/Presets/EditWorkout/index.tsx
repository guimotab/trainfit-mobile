import { Pressable, Button, StyleSheet, Text, View } from "react-native"
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
    return (
        <>
            <View style={styles.sectionView}>
                <PresetGroup
                    id={id}
                    saveTable={saveTable}
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
        gap: 20
    },
    viewSave: {
        display: "flex",
        color: cor.gray200,
        fontWeight: font.semibold,
        fontSize: 16,
        borderRadius: 8
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

