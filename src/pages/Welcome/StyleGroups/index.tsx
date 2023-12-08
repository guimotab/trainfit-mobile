import { Tables } from "../../../models/Tables"
import usePreferences from "../../../state/hooks/usePreferences"
import useTables from "../../../state/hooks/useTables"
import { AsyncStorager } from "../../../service/AsyncStorager"
import { AllPreferences } from "../../../models/AllPreferences"
import { useUpdatePreferences } from "../../../state/hooks/useUpdatePreferences"
import Styles from "./Styles"
import { ScrollView, Button, StyleSheet, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { cor, font } from "../../../utils/presetStyles"

const StyleGroups = () => {
    const navigation = useNavigation()
    const tables = new Tables(useTables())
    const preferences = new AllPreferences(usePreferences())
    const setPreferences = useUpdatePreferences()
    function saveInformations() {
        preferences.initializer = true
        AsyncStorager.saveTables(tables.tables)
        AsyncStorager.savePreferences(preferences.returnInformation())
        setPreferences(preferences.returnInformation())
        navigation.navigate("Home")
    }
    return (
        <View style={styles.section}>
            <ScrollView style={styles.divSection}>
                <View style={styles.divTextExercises}>
                    <View style={styles.textGroup}>
                        <Text style={styles.textH1}>Falta <Text style={styles.textSpanH1}>Pouco!</Text></Text>
                        <Text style={styles.textH2}>Estilize os ícones de cada grupo muscular! (opcional)</Text>
                    </View>
                    <View style={styles.preferenceButtonsGroup}>
                        <View style={styles.preferences}>
                            {preferences.preferences.map(preference => <Styles key={preference.id}  preference={preference} />)}
                        </View>
                        <View style={styles.buttonsGroup}>
                            <Text
                                onPress={event => navigation.goBack()}
                                style={styles.button}
                            > Voltar</Text>
                            <Text
                                onPress={event => saveInformations()}
                                style={styles.button}
                            > Próximo</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    section: {
        display: "flex",
        justifyContent: "center",
        flex: 1,
        backgroundColor: cor.gray900, //900,
        paddingTop: 20,
    },
    divSection: {
        //"animate-entraceWelcome"
        display: "flex",
        flex: 1,
        paddingVertical: 40,
    },
    divTextExercises: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
    },
    textGroup: {
        paddingHorizontal: 25,
        display: "flex",
        flexDirection: "column",
        gap: 5
    },
    textH1: {
        color: cor.gray200,
        fontWeight: font.semibold,
        fontSize: 30
    },
    textH2: {
        color: cor.gray200,
        fontWeight: font.semibold,
        fontSize: 17
    },
    preferenceButtonsGroup: {
        display: "flex",
        flexDirection: "column",
        gap: 40
    },
    textSpanH1: {
        color: cor.hover,
        fontWeight: font.bold
    },
    preferences: {
        display: "flex",
        flexDirection: "column",
        marginTop: 30,
        paddingHorizontal: 10,
        gap: 25
    },
    buttonsGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        marginBottom: 65,
        paddingHorizontal: 24,
    },
    button: {
        alignSelf: "flex-end",
        color: cor.gray200,//400
        fontSize: 18, //lg
        fontWeight: font.medium,//medium
        borderColor: cor.secundaria,
        borderWidth: 2,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8 //lg
    }
})

export default StyleGroups