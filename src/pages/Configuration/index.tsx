import useErrorProgram from "../../state/hooks/useErrorProgram"
import ErrorProgram from "../../components/ErrorProgram"
import SucessProgram from "../../components/SucessProgram"
import useSucessProgram from "../../state/hooks/useSucessProgram"
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native"
import { cor, font } from "../../utils/presetStyles"
import useChangedWarning from "../../state/hooks/useChangedWarning"
import ChangedWarning from "../../components/ChangedWarning"
import UploadDownloadInformation from "./UploadDownloadInformations"
import DeleteInformations from "./DeleteInformations"
import WarningDeleteInformations from "./DeleteInformations/WarningInformations"
import { useState } from "react"

const Configuration = () => {
    const erroProgram = useErrorProgram()
    const sucessProgram = useSucessProgram()
    const changedWarning = useChangedWarning()
    const [showWarning, setShowWarning] = useState(false)

    // const rotationKeyFrame = new Keyframe({
    //     0: {
    //         transform: [{
    //             rotate: "0"
    //         }]
    //     },
    //     100: {
    //         transform: [{
    //             rotate: "360deg"
    //         }]
    //     }
    // })
    return (
        <>
            <WarningDeleteInformations setShowWarning={setShowWarning} showWarning={showWarning} />
            <View style={styles.screen}>
                <ScrollView>
                    <View style={styles.section}>
                        <UploadDownloadInformation />
                        <DeleteInformations showWarning={showWarning} setShowWarning={setShowWarning}/>
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
    absolute: {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        zIndex: 20,
    },
    opacity: {
        position: "absolute",
        height: "100%",
        width: "100%",
        opacity: 0.4,
        backgroundColor: "#000",
    },
    loading: {
        height: 70,
        width: 70
    },
    icon: {
        position: "absolute",
        top: -100,
        width: 70,
        height: 70,
        borderRightColor: "#fff",
        borderTopColor: "#fff",
        borderBottomColor: "#fff",
        borderLeftColor: cor.secundaria,
        borderWidth: 6,
        borderRadius: 35,
    },
    screen: {
        backgroundColor: cor.gray900,
        flex: 1
    },
    section: {
        display: "flex",
        flexDirection: "column",
        gap: 30,
        paddingHorizontal: 20,
        flex: 1
    },
});
export default Configuration