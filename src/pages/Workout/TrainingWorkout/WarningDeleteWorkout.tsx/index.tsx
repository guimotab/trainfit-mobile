import { useNavigation, useRoute } from "@react-navigation/native"
import { View, Text, StyleSheet } from "react-native"
import { MuscleGroup } from "../../../../models/MuscleGroup"
import { Tables } from "../../../../models/Tables"
import { cor, font } from "../../../../utils/presetStyles"
import { IMuscleGroupInformations } from "../../../../shared/interfaces/IMuscleGroupInformations"
import { ParamsProps } from "../../../../@types/navigation"
import { AsyncStorager } from "../../../../service/AsyncStorager"
import useTables from "../../../../state/hooks/useTables"
import { useUpdateTables } from "../../../../state/hooks/useUpdateTables"

interface WarningDeleteWorkoutProps {
    currentTable: MuscleGroup
    showWarning: boolean
    setShowWarning: React.Dispatch<React.SetStateAction<boolean>>
    workout: IMuscleGroupInformations
}
const WarningDeleteWorkout = ({ currentTable, showWarning, setShowWarning, workout }: WarningDeleteWorkoutProps) => {
    const navigation = useNavigation()
    const tables = new Tables(useTables())
    const setTables = useUpdateTables()
    const route = useRoute()
    const params = route.params as ParamsProps
    const id = params.id.toString()
    function deleteTable() {
        currentTable.deleteInformations(workout.date)
        tables.updateTables(currentTable)
        setTables(tables.tables)
        AsyncStorager.saveTables(tables.tables)
        navigation.navigate("Workout", { id: Number(id) })
    }
    function cancelDelete() {
        setShowWarning(false)
    }
    return (
        <>
            {showWarning ?
                <>
                    <View style={styles.absolute} />
                    <View style={styles.section}>
                        <View style={styles.viewSection}>
                            <View style={styles.viewText}>
                                <Text style={styles.text}>{`Você irá excluir`}</Text>
                                <Text style={styles.text}>{`"${workout.date}"`}</Text>
                            </View>
                            <View style={styles.viewButton}>
                                <Text onPress={event => deleteTable()} style={styles.buttonDelete}
                                >Excluir</Text>
                                <Text onPress={event => cancelDelete()} style={styles.buttonSave}
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
    absolute: {
        position: "absolute",
        flex: 1,
        height: 10000,
        width: 10000,
        zIndex: 20,
        left: -100,
        top: -7000,
        backgroundColor: "#fff",
        opacity: 0.05
    },
    section: {
        zIndex: 30,
        display: "flex",
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    viewSection: {
        display: "flex",
        position: "absolute",
        alignItems: "center",
        width: "85%",
        maxHeight: 130,
        top: 300,
        gap: 15,
        borderColor: cor.gray400,
        borderWidth: 0.5,
        backgroundColor: cor.gray900,
        borderRadius: 8,
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
    buttonDelete: {
        backgroundColor: cor.gray700,
        color: cor.erroLight,
        fontSize: 15,
        fontWeight: font.medium,
        borderColor: cor.gray500,
        borderWidth: 0.5,
        paddingHorizontal: 16,
        paddingVertical: 3,
        borderRadius: 5,
    },
    buttonSave: {
        backgroundColor: cor.gray700,
        color: "#fff",
        fontSize: 15,
        fontWeight: font.medium,
        borderColor: cor.gray500,
        borderWidth: 0.5,
        paddingHorizontal: 16,
        paddingVertical: 3,
        borderRadius: 5,
    }
});

export default WarningDeleteWorkout