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
                <View style={styles.section}>
                    <View style={styles.viewSection}>
                        <View style={styles.viewText}>
                            <Text style={styles.text}>{`Você irá excluir "${currentTable.name}"`}</Text>
                            <Text style={styles.text}>{"Você tem certeza?"}</Text>
                        </View>
                        <View style={styles.viewButton}>
                            <Text onPress={event => deleteTable()} style={styles.button}
                            >Sim</Text>
                            <Text onPress={event => cancelDelete()} style={styles.button}
                            >Não</Text>
                        </View>
                    </View>
                </View>
                : <></>
            }
        </>
    )
}
const styles = StyleSheet.create({
    section: {
        zIndex: 10,
        width: "115%",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
        top: 0
    },
    viewSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        backgroundColor: cor.secundaria,
        borderRadius: 5,
        paddingHorizontal: 18,
        paddingVertical: 8,

    },
    viewText: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    text: {
        color: cor.gray200,
        fontSize: 17,
        fontWeight: font.medium
    },
    viewButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 40,
        gap: 80
    },
    button: {
        backgroundColor: cor.terciaria,
        color: "#fff",
        fontSize: 17,
        paddingHorizontal: 12,
        paddingVertical: 3,
        borderRadius: 5,
    }
});

export default WarningDeleteTable