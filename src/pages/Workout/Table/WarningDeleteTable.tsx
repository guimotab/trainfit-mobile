import { AllPreferences } from "../../../models/AllPreferences"
import { MuscleGroup } from "../../../models/MuscleGroup"
import { Tables } from "../../../models/Tables"
import { AsyncStorager } from "../../../service/LocalStorager"
import usePreferences from "../../../state/hooks/usePreferences"
import useTables from "../../../state/hooks/useTables"
import { useUpdatePreferences } from "../../../state/hooks/useUpdatePreferences"
import { useUpdateTables } from "../../../state/hooks/useUpdateTables"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet, View, Text } from "react-native"
import { cor, font } from "../../../utils/presetStyles";

interface WarningDeleteTableProps {
    currentTable: MuscleGroup
    showWarning: boolean
    setShowWarning: React.Dispatch<React.SetStateAction<boolean>>
}
const WarningDeleteTable = ({ currentTable, showWarning, setShowWarning }: WarningDeleteTableProps) => {
    const navigation = useNavigation()
    const tables = new Tables(useTables())
    const setTables = useUpdateTables()
    const preferences = new AllPreferences(usePreferences())
    const setPreferences = useUpdatePreferences()

    function deleteTable() {
        tables.removeTable(currentTable.id)
        preferences.removePreference(currentTable.id)
        setPreferences(preferences.returnInformation())
        setTables(tables.tables)
        setShowWarning(false)
        AsyncStorager.saveTables(tables.tables)
        AsyncStorager.savePreferences(preferences.returnInformation())
        navigation.navigate("Home")
    }
    function cancelDelete() {
        setShowWarning(false)
    }
    return (
        <>
            {showWarning ?
                <>
                    <View style={{position: "absolute", flex: 1, height: 10000, width: 10000, zIndex: 20, left: -100, top: -7000,}}/>
                    <View style={styles.section}>
                        <View style={styles.viewSection}>
                            <View style={styles.viewText}>
                                <Text style={styles.text}>{`Você irá excluir "${currentTable.name}"...`}</Text>
                            </View>
                            <View style={styles.viewButton}>
                                <Text onPress={event => deleteTable()} style={styles.button}
                                >Excluir</Text>
                                <Text onPress={event => cancelDelete()} style={styles.button2}
                                >Manter</Text>
                            </View>
                        </View>
                    </View>
                </>
                : <></>
            }
        </>
    )
}
const styles = StyleSheet.create({
    section: {
        zIndex: 30,
        display: "flex",
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
        top: 0
    },
    viewSection: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: 10,
        backgroundColor: cor.secundaria,
        paddingVertical: 15,

    },
    viewText: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    text: {
        color: cor.gray200,
        fontSize: 19,
        fontWeight: font.semibold
    },
    viewButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 40,
        marginBottom: 6,
        gap: 80
    },
    button: {
        backgroundColor: cor.terciaria,
        color: "#fff",
        fontSize: 17,
        paddingHorizontal: 12,
        paddingVertical: 3,
        borderRadius: 5,
    },
    button2: {
        // backgroundColor: "#fff",
        // color: cor.terciaria,
        backgroundColor: cor.terciaria,
        color: "#fff",
        fontSize: 17,
        paddingHorizontal: 12,
        paddingVertical: 3,
        borderRadius: 5,
    }
});

export default WarningDeleteTable