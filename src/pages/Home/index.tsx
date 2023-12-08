import { Button, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { AllPreferences } from "../../models/AllPreferences"
import { Tables } from "../../models/Tables"
import usePreferences from "../../state/hooks/usePreferences"
import useTables from "../../state/hooks/useTables"
import { useUpdatePreferences } from "../../state/hooks/useUpdatePreferences"
import { useUpdateTables } from "../../state/hooks/useUpdateTables"
import AllWorkouts from "./AllWorkouts"
import { IPreferencesWorkout } from "../../shared/interfaces/IPreferencesWorkout"
import { cor, font } from "../../utils/presetStyles"
import Navigation from "../../components/Navigation"
import Add from 'react-native-vector-icons/Ionicons'
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
            <View style={styles.body}>
                <ScrollView>
                    <View style={styles.section}>
                        <View style={styles.TitleTextGroup}>
                            <Text style={styles.h1}>Train<Text style={styles.spanH1}>Fit</Text></Text>
                            <View style={styles.muscleButton}>
                                <Text style={styles.textMuscleButton}>Seus Grupos</Text>
                                <Pressable style={styles.buttonMuscle}>
                                    <Add name="add" style={styles.icon} />
                                    <Text onPress={event => createMuscularGroup()} style={styles.textButton}>Adicionar Novo </Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.AllWokouts}>
                            {tables.tables ? tables.tables.map(table =>
                                <AllWorkouts key={table.id} table={table} />
                            ).reverse() : <></>}
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Navigation />
        </>
    )
}
const styles = StyleSheet.create({
    body: {
        backgroundColor: cor.gray900,
        flex: 1
    },
    section: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        gap: 15,
        padding: 20,
        marginBottom: 70
    },
    TitleTextGroup: {
        display: "flex",
        flexDirection: "column",
        gap: 20
    },
    h1: {
        marginTop: 35,
        color: cor.gray200,
        fontWeight: "800",
        fontSize: 30
    },
    spanH1: {
        color: cor.secundaria,
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
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    textMuscleButton: {
        fontSize: 20,
        fontWeight: font.semibold,
        color: cor.gray200
    },
    buttonMuscle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: cor.secundaria,        
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 5,
        fontWeight: font.semibold,
        color: cor.gray200
    },
    icon:{
        color: cor.gray200,
        fontSize: 21
    },
    textButton:{
        color: cor.gray200,
        fontWeight: font.semibold,
        fontSize: 15
    },
    AllWokouts: {
        display: "flex",
        flexDirection: "row",
        gap: 20,
        flexWrap: "wrap",
    },
});
export default Home