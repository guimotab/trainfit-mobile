import { AsyncStorager } from "../../service/AsyncStorager"
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
                            {text.map((text, index) => <Text key={index} style={styles.text}>{text}</Text>)}
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
        display: "flex",
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
        top: 0
    },
    viewSection: {
        width: "100%",
        display: "flex",
        gap: 10,
        paddingHorizontal: 18,
        paddingVertical: 15,
        borderWidth: 0.5,
        backgroundColor: cor.gray800,
    },
    viewText: {
        display: "flex",
        alignItems: "center",
    },
    text: {
        color: cor.gray200,
        fontSize: 18,
        fontWeight: font.medium
    },
    viewButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 6,
        gap: 30
    },
    button: {
        backgroundColor: cor.secundaria,
        color: "#fff",
        fontSize: 17,
        paddingHorizontal: 12,
        paddingVertical: 3,
        borderRadius: 5,
    }
});
export default WarningProgram