import MuscularGroup from "../MuscularGroup"
import { IPreferencesWorkout } from "../../../shared/interfaces/IPreferencesWorkout"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useUpdateMessageProgram } from "../../../state/hooks/useUpdateMessageProgram"
import { cor, font } from "../../../utils/presetStyles"
import { IMuscleGroup } from "../../../shared/interfaces/IMuscleGroup"
import findCurrentPreference from "../../../utils/findCurrentPreference"

interface PresetGroupProps {
    id: string
    saveTable: IMuscleGroup[]
    savePreferences: IPreferencesWorkout[]
    setSaveTable: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
    setSavePreferences: React.Dispatch<React.SetStateAction<IPreferencesWorkout[]>>
}

const PresetGroup = ({ id, saveTable, savePreferences, setSavePreferences, setSaveTable }: PresetGroupProps) => {
    const setMessageProgram = useUpdateMessageProgram()
    const savePreference = findCurrentPreference(savePreferences, id)
    useEffect(() => {
        setMessageProgram([""], "none")
    }, [])
    
    return (
        <View style={styles.sectionView} >
            <Text style={styles.textTrain}>Predefinição</Text>
            <View style={styles.viewMuscularGroup}>
                <MuscularGroup
                    key={savePreference.nameMuscleGroup}
                    preference={savePreference}
                    savePreferences={savePreferences}
                    saveTable={saveTable}
                    setSaveTable={setSaveTable}
                    setSavePreferences={setSavePreferences} />
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    sectionView: {
        display: "flex",
        flexDirection: "column",
        marginTop: 15,
        gap: 10,
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
});
export default PresetGroup