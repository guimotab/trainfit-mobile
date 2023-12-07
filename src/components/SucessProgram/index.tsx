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
                    {text.map((text, index)=><Text key={index} style={styles.text}>{text}</Text>)}
                </View>
                : <></>
            }
        </>
    )
}
const styles = StyleSheet.create({
    section: {
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "center",
        backgroundColor: cor.green700,
    },
    text: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        color:cor.gray200,
        fontSize: 17,
        fontWeight: font.medium
    },
});
export default SucessProgram