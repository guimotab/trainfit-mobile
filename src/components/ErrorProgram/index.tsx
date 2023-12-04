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
        zIndex: 10,
        position: "absolute",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        gap: 4,
        alignItems: "center",
        top: 40,
    },
    text: {
        borderRadius: 5,
        paddingHorizontal: 18,
        backgroundColor: cor.deleteHover,
        color:cor.gray200,
        fontSize: 17,
        fontWeight: font.medium
    },
});
export default ErrorProgram