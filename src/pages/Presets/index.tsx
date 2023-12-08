import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native"
import { cor, font } from "../../utils/presetStyles"
import { Tables } from "../../models/Tables"
import useTables from "../../state/hooks/useTables"
import WorkoutCards from "./WorkoutCards"
const Presets = () => {
    const tables = new Tables(useTables())
    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.section}>
                    <View style={styles.sectionView}>
                        <Text style={{ color: cor.gray200, fontWeight: font.semibold, fontSize: 22 }}>Escolha um treino para editar:</Text>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
                            {tables.tables.map(table => <WorkoutCards key={table.id} table={table} />)}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )

}
const styles = StyleSheet.create({
    screen: {
        backgroundColor: cor.gray900,
        flex: 1
    },
    section: {
        position: "relative",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 30,
        paddingHorizontal: 20,
        flex: 1
    },
    sectionView: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        flex: 1,
        marginTop: 10,
        gap: 20
    },
});
export default Presets