import { Button, StyleSheet, Text, View } from "react-native"
import { AllPreferences } from "../../models/AllPreferences"
import { Tables } from "../../models/Tables"
import usePreferences from "../../state/hooks/usePreferences"
import useTables from "../../state/hooks/useTables"
import { useUpdatePreferences } from "../../state/hooks/useUpdatePreferences"
import { useUpdateTables } from "../../state/hooks/useUpdateTables"
import AllWorkouts from "./AllWorkouts"
import { IPreferencesWorkout } from "../../shared/interfaces/IPreferencesWorkout"
import Header from "../../components/Header"
const Home = () => {
    const tables = new Tables(useTables())
    const setTable = useUpdateTables()
    const preferences = new AllPreferences(usePreferences())
    const setPreferences = useUpdatePreferences()
    function createMuscularGroup() {
        let newId: number
        if (tables.tables[0]) {
            newId = tables.tables[tables.tables.length - 1].id + 1
        } else {
            newId = 1
        }
        const newPreference = {
            id: newId,
            nameMuscleGroup: "Novo Grupo " + newId,
            basesExercises: []
        } as IPreferencesWorkout
        tables.addNewTable(newPreference.id, newPreference.nameMuscleGroup, [])
        preferences.pushPreference(newPreference)
        setPreferences(preferences.returnInformation())
        setTable(tables.tables)
    }

    return (
        <>
            <Header />
            <View style={styles.section}>
                <View style={styles.section}>
                    <View style={styles.muscleButton}>
                        <Text style={styles.textMuscleButton}>Grupos Musculares</Text>
                        <Button
                            title="Novo Grupo Muscular"
                            accessibilityLabel="Novo Grupo Muscular"
                            onPress={event => createMuscularGroup()} />
                    </View>
                    <View style={styles.AllWokouts}>
                        {tables.tables ? tables.tables.map(table =>
                            <AllWorkouts key={table.id} table={table} />
                        ).reverse() : <></>}
                    </View>
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    section: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: '#053B50',
        padding: 20,
        height: "100%",
        width: "100%",
        minHeight: "100%",
    },
    div: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
        width: "auto"
    },
    muscleButton: {
        display: "flex",
        marginTop: 30,
        width: "auto"
    },
    textMuscleButton: {
        fontSize: 20,
        fontWeight: "600",
        color: "#ebebeb"
    },
    AllWokouts: {
        width: 170,
        height: "auto",
        borderRadius: 10,
        backgroundColor: "#374151"
    }, iconNameWorkout: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 5
    }
});
export default Home


