import { useEffect, useState } from "react"
import { Tables } from "../../../models/Tables"
import useTables from "../../../state/hooks/useTables"
import { useUpdateTables } from "../../../state/hooks/useUpdateTables"
import IconsGroup from "./IconsGroup"
import { useUpdateMessageProgram } from "../../../state/hooks/useUpdateMessageProgram"
import { AsyncStorager } from "../../../service/LocalStorager"
import { StyleSheet, Text, View, Pressable } from "react-native"
import { cor, font } from "../../../utils/presetStyles"
const StyleIcons = () => {
    const tables = new Tables(useTables())
    const setTables = useUpdateTables()
    const [saveTable, setSaveTable] = useState(tables.tables)
    const setMessageProgram = useUpdateMessageProgram()
    useEffect(() => {
        setSaveTable(tables.tables)
    }, [tables.tables])

    async function saveInformations() {
        setMessageProgram(["Ícones salvos com sucesso!"], "sucess")
        setTables(saveTable)
        await AsyncStorager.saveTables(saveTable)
    }
    return (
        <View style={styles.section}>
            <View style={styles.textGroup}>
                <Text style={styles.text}>Ícones dos Treinos</Text>
                <View>
                    <Text
                        onPress={event => saveInformations()}
                        style={styles.buttonSave}>
                        Salvar alterações
                    </Text>
                </View>
            </View>
            <View style={styles.viewMuscularGroup}>
                {tables.tables.map(table =>
                    <IconsGroup key={table.id} table={table} saveTable={saveTable} setSaveTable={setSaveTable} />
                )}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    section: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "flex-start",
        marginBottom: 30
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