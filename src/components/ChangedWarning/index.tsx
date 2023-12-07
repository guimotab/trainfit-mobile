import { StyleSheet, View, Text } from "react-native"
import { cor, font } from "../../utils/presetStyles";
interface ChangedWarningProps {
    text: string[]
}
const ChangedWarning = ({ text }: ChangedWarningProps) => {
    return (
        <>
            {text[0] !== "" ?
                <View style={styles.section}>
                    {text.map((text, index) => <Text key={index} style={styles.text}>{text}</Text>)}
                </View>
                : <></>
            }
        </>
    )
}
const styles = StyleSheet.create({
    section: {
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "center",
        backgroundColor: cor.deleteHover,
    },
    text: {
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 18,
        color: cor.gray200,
        fontSize: 17,
        fontWeight: font.medium
    },
});
export default ChangedWarning