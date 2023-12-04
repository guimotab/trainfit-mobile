import { AsyncStorager } from "../../service/LocalStorager"
import { IMuscleGroup } from "../../shared/interfaces/IMuscleGroup"
import useTables from "../../state/hooks/useTables"
import { useUpdateTables } from "../../state/hooks/useUpdateTables"
import { useUpdateMessageProgram } from "../../state/hooks/useUpdateMessageProgram"
import { StyleSheet, View, Text } from "react-native"
import { cor, font } from "../../utils/presetStyles";

interface WarningProgramProps {
    text: string[]
    saveTable?: IMuscleGroup[]
    setSaveTable?: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
}
const WarningProgram = ({ text, saveTable, setSaveTable }: WarningProgramProps) => {
    const tables = useTables()
    const setTables = useUpdateTables()
    const setMessageProgram = useUpdateMessageProgram()
    function cancelChanges() {
        setMessageProgram([""], "none")
        if (setSaveTable) {
            setSaveTable(tables)
        }
    }
    function saveChange() {
        setMessageProgram([""], "none")
        if (setSaveTable && saveTable) {
            setSaveTable(saveTable)
            setTables(saveTable)
            AsyncStorager.saveTables(saveTable)
        }
    }
    return (
        <>
            {text[0] !== "" ?
                <View style={styles.section}>
                    <View style={styles.viewSection}>
                        <View style={styles.viewText}>
                            {text.map(text => <Text style={styles.text}>{text}</Text>)}
                        </View>
                        <View style={styles.viewButton}>
                            <Text onPress={event => saveChange()} style={styles.button}>Salvar</Text>
                            <Text onPress={event => cancelChanges()} style={styles.button}>Desfazer</Text>
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
        width: "120%",
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
        width: "55%",
        gap: 8,
        backgroundColor: cor.secundaria,
        borderRadius: 5,
        paddingHorizontal: 18,
        paddingVertical: 8,

    },
    viewText: {
        display: "flex",
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
        justifyContent: "space-between"
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
export default WarningProgram