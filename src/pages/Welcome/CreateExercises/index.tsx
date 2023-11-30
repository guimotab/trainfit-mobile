import usePreferences from "../../../state/hooks/usePreferences"
import ExercisesMuscleGroup from "../ExercisesMuscleGroup"
import { AllPreferences } from "../../../models/AllPreferences"
import ErrorProgram from "../../../components/ErrorProgram"
import useErrorProgram from "../../../state/hooks/useErrorProgram"
import { useNavigation } from "@react-navigation/native"
import { ScrollView, Button, StyleSheet, Text, View } from "react-native"
import { cor, font } from "../../../utils/presetStyles"


const CreateExercises = () => {
    const navigation = useNavigation()
    const preferences = new AllPreferences(usePreferences())
    const erroProgram = useErrorProgram()
    return (
        <View style={styles.section}>
            <ScrollView style={styles.divSection}>
                <View style={styles.divTextExercises}>
                    <View style={styles.textGroup}>
                        <Text style={styles.textH1}>Muito <Text style={styles.textSpanH1}>Bom!</Text></Text>
                        <Text style={styles.textH2}>Agora adicione os exercícios de cada grupo!</Text>
                    </View>
                    <View style={styles.preferenceButtonsGroup}>
                        <View style={styles.preferences}>
                            {preferences.preferences.map(preference => <ExercisesMuscleGroup key={preference.id} preference={preference} />)}
                        </View>
                        <View style={styles.buttonsGroup}>
                            <Text
                                onPress={event => navigation.goBack()}
                                style={styles.button}
                            > Voltar</Text>
                            <Text
                                onPress={event => navigation.navigate("StyleGroups")}
                                style={styles.button}
                            > Próximo</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <ErrorProgram text={erroProgram} />
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
        //'flex flex-col max-w-5xl gap-7 w-full'
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
    },
    textGroup: {
        //'flex flex-col gap-5'
        paddingHorizontal: 25,
        display: "flex",
        flexDirection: "column",
        gap: 5
    },
    textH1: {
        //"text-gray-200 font-semibold text-3xl"
        color: cor.gray200,
        fontWeight: font.semibold,
        fontSize: 30
    },
    textH2: {
        //"text-gray-200 font-semibold text-3xl"
        color: cor.gray200,
        fontWeight: font.semibold,
        fontSize: 17
    },
    preferenceButtonsGroup:{
        display: "flex",
        flexDirection: "column",
        gap: 40
    },
    textSpanH1: {
        //"text-cor-hover font-bold "
        color: cor.hover,
        fontWeight: font.bold
    },
    preferences: {
        //'grid grid-cols-2 gap-y-6 mt-3 px-6'
        display: "flex",
        flexDirection: "column",
        marginTop: 30,
        paddingHorizontal: 10,
        gap: 25
    },
    buttonsGroup: {
        //"flex items-center justify-between w-full px-6"
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
export default CreateExercises