import useErrorProgram from "../../state/hooks/useErrorProgram"
import ErrorProgram from "../../components/ErrorProgram"
import SucessProgram from "../../components/SucessProgram"
import useSucessProgram from "../../state/hooks/useSucessProgram"
import PresetGroup from "./PresetGroup"
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native"
import { cor, font } from "../../utils/presetStyles"
import StyleIcons from "./StyleIcons"

const Configuration = () => {
    const erroProgram = useErrorProgram()
    const sucessProgram = useSucessProgram()

    return (
        <ScrollView>
            <View style={styles.section}>
                <View style={styles.sectionView}>
                    <PresetGroup />
                    <StyleIcons />
                </View>
                <ErrorProgram text={erroProgram} />
                <SucessProgram text={sucessProgram} />
            </View>
        </ScrollView>
    )

}
const styles = StyleSheet.create({
    section: {
        position: "relative",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 30,
        paddingHorizontal: 20,
        backgroundColor: cor.gray900,
        flex: 1
    },
    sectionView: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        gap: 50
    },
});
export default Configuration