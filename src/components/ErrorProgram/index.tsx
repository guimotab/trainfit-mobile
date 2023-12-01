import { StyleSheet, View, Text} from "react-native"
import { cor, font } from "../../utils/presetStyles";
interface ErrorProgramProps {
    text: string[]
}
const ErrorProgram = ({ text }: ErrorProgramProps) => {
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
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "center",
        backgroundColor: cor.gray900,
        borderRadius: 12,
        paddingHorizontal: 16,
        top: 40
    },
    text: {
        color:cor.gray200,
        fontSize:12,
        fontWeight: font.medium
    },
});
export default ErrorProgram