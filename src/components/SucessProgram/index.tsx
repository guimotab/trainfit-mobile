import { StyleSheet, View, Text} from "react-native"
import { cor, font } from "../../utils/presetStyles";
interface SucessProgramProps {
    text: string[]
}
const SucessProgram = ({ text }: SucessProgramProps) => {
    return (
        <>
            {text[0] !== "" ?
                <View style={styles.section}>
                    {text.map(text=><Text style={styles.text}>{text}</Text>)}
                </View>
                : <></>
            }
        </>
    )
}
const styles = StyleSheet.create({
    section: {
        zIndex: 10,
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "center",
        backgroundColor: cor.green700,
        borderRadius: 5,
        paddingHorizontal: 18,
        paddingVertical: 3,
        top: 20
    },
    text: {
        color:cor.gray200,
        fontSize: 17,
        fontWeight: font.medium
    },
});
export default SucessProgram