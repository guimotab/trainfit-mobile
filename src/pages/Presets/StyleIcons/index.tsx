import { useEffect, useState } from "react"
import { Tables } from "../../../models/Tables"
import useTables from "../../../state/hooks/useTables"
import { useUpdateTables } from "../../../state/hooks/useUpdateTables"
import IconsGroup from "./IconsGroup"
import { useUpdateMessageProgram } from "../../../state/hooks/useUpdateMessageProgram"
import { AsyncStorager } from "../../../service/AsyncStorager"
import { StyleSheet, Text, View, Pressable } from "react-native"
import { cor, font } from "../../../utils/presetStyles"
import { IMuscleGroup } from "../../../shared/interfaces/IMuscleGroup"
import { MuscleGroup } from "../../../models/MuscleGroup"
import findCurrentTable from "../../../utils/findCurrentTable"
interface StyleIconsProps {
    id: string
    saveTable: IMuscleGroup[]
    setSaveTable: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
}
const StyleIcons = ({ id, saveTable, setSaveTable }: StyleIconsProps) => {
    const tables = new Tables(useTables())
    const currentTable = new MuscleGroup(findCurrentTable(saveTable, id!))
    const setTables = useUpdateTables()
    const setMessageProgram = useUpdateMessageProgram()
    useEffect(() => {
        setSaveTable(tables.tables)
    }, [tables.tables])

    
    return (
        <View style={styles.section}>
            <View style={styles.textGroup}>
                <Text style={styles.text}>Ícones</Text>
            </View>
            <View style={styles.viewMuscularGroup}>
                <IconsGroup key={currentTable.id} table={currentTable} saveTable={saveTable} setSaveTable={setSaveTable} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    section: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "flex-start",
        marginBottom: 10
    },
    sectionView: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    text: {
        fontWeight: font.bold,
        fontSize: 20,
        color: cor.gray200
    },
    textGroup: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    buttonSave: {
        width: 145,
        fontWeight: font.semibold,
        fontSize: 15,
        paddingHorizontal: 13,
        paddingVertical: 6,
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
export default StyleIcons