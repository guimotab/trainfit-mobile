import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native"
import { cor, font } from "../../utils/presetStyles"
import { Tables } from "../../models/Tables"
import useTables from "../../state/hooks/useTables"
import WorkoutCards from "./WorkoutCards"
import { FlatList } from "react-native"
const Presets = () => {
    const tables = new Tables(useTables())
    return (
        <View style={styles.screen}>
            <View style={styles.section}>
                <View style={styles.sectionView}>
                    <Text style={{ color: cor.gray200, fontWeight: font.semibold, fontSize: 22, paddingHorizontal: 20, }}>Escolha um treino para editar:</Text>
                    <FlatList
                        contentContainerStyle={{ gap: 20, paddingHorizontal: 20, }}
                        columnWrapperStyle={{ gap: 20 }}
                        numColumns={2}
                        horizontal={false}
                        data={tables.tables}
                        renderItem={({ item, index }) =>
                            <WorkoutCards
                                key={item.id}
                                table={item} />
                        }
                    />
                </View>
            </View>
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