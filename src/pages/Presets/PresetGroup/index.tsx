import MuscularGroup from "../MuscularGroup"
import { IPreferencesWorkout } from "../../../shared/interfaces/IPreferencesWorkout"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View, TextInput } from "react-native"
import { useUpdateMessageProgram } from "../../../state/hooks/useUpdateMessageProgram"
import { cor, font } from "../../../utils/presetStyles"
import { IMuscleGroup } from "../../../shared/interfaces/IMuscleGroup"
import findCurrentPreference from "../../../utils/findCurrentPreference"
import { MuscleGroup } from "../../../models/MuscleGroup"
import { PreferencesWorkout } from "../../../models/PreferencesWorkout"
import { Tables } from "../../../models/Tables"

interface PresetGroupProps {
    valueInput: string
    savePreference: IPreferencesWorkout
    savePreferences: IPreferencesWorkout[]
    setSaveTable: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
    setSavePreferences: React.Dispatch<React.SetStateAction<IPreferencesWorkout[]>>
}

const PresetGroup = ({ valueInput, savePreference, savePreferences, setSavePreferences, setSaveTable }: PresetGroupProps) => {
    const setMessageProgram = useUpdateMessageProgram()
    useEffect(() => {
        setMessageProgram([""], "none")
    }, [])
    
    return (
        <View style={styles.sectionView}>
            <View style={{ display: "flex" }}>
                <Text style={styles.titleTrain}>Defina Seus Exercícios</Text>
                <Text style={styles.textTrain}>Adicione seus exercícios para faciliar suas anotações!</Text>
            </View>
            <View style={styles.viewMuscularGroup}>
                <MuscularGroup
                    key={savePreference.nameMuscleGroup}
                    valueInput={valueInput}
                    preference={savePreference}
                    savePreferences={savePreferences}
                    setSavePreferences={setSavePreferences} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    sectionView: {
        display: "flex",
        marginTop: 5,
        flexDirection: "column",
        paddingTop: 15,
        gap: 16,
    },
    titleTrain: {
        fontWeight: font.bold,
        fontSize: 20,
        color: cor.gray200
    },
    textTrain: {
        fontSize: 15,
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
});
export default PresetGroup