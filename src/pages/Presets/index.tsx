import useErrorProgram from "../../state/hooks/useErrorProgram"
import ErrorProgram from "../../components/ErrorProgram"
import SucessProgram from "../../components/SucessProgram"
import useSucessProgram from "../../state/hooks/useSucessProgram"
import PresetGroup from "./PresetGroup"
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native"
import { cor, font } from "../../utils/presetStyles"
import StyleIcons from "./StyleIcons"
import useChangedWarning from "../../state/hooks/useChangedWarning"
import ChangedWarning from "../../components/ChangedWarning"

const Presets = () => {
    const erroProgram = useErrorProgram()
    const sucessProgram = useSucessProgram()
    const changedWarning= useChangedWarning()

    return (
        <>
            <View style={styles.screen}>
                <ScrollView>
                    <View style={styles.section}>
                        <View style={styles.sectionView}>
                            <PresetGroup />
                            <StyleIcons />
                        </View>
                    </View>
                </ScrollView>
            </View>
            <ErrorProgram text={erroProgram} />
            <ChangedWarning text={changedWarning} />
            <SucessProgram text={sucessProgram} />
        </>
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
        gap: 50
    },
});
export default Presets