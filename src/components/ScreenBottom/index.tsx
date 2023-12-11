import { Pressable, View, StyleSheet } from "react-native";
import { cor, font } from "../../utils/presetStyles";
interface ScreenBottomProps {
    children: JSX.Element
    showEdit: string
    setShowEdit: (event: string) => void
}

const ScreenBottom = ({ children, setShowEdit, showEdit }: ScreenBottomProps) => {
    return (
        <>
            {showEdit !== "" ?
                <>
                    <Pressable style={styles.absolute} onPress={event => setShowEdit("")} />
                    <View style={styles.section}>
                        <View style={styles.viewSection}>
                            {children}
                        </View>
                    </View>
                </>
                : <></>
            }
        </>
    )
}
const styles = StyleSheet.create({
    absolute: {
        position: "absolute",
        flex: 1,
        height: 10000,
        width: 10000,
        zIndex: 20,
        left: -100,
        top: -7000,
        backgroundColor: "#000",
        opacity: 0.4
    },
    section: {
        zIndex: 20,
        display: "flex",
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
        top: 0
    },
    viewSection: {
        width: "100%",
        display: "flex",
        gap: 10,
        paddingHorizontal: 18,
        paddingVertical: 15,
        backgroundColor: cor.gray800,
    },
    viewText: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    text: {
        color: cor.gray200,
        fontSize: 19,
        fontWeight: font.semibold
    },
    viewButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 40,
        marginBottom: 6,
        gap: 80
    },
    buttonDelete: {
        backgroundColor: cor.gray700,
        color: cor.erroLight,
        fontSize: 15,
        fontWeight: font.medium,
        borderColor: cor.gray500,
        borderWidth: 0.5,
        paddingHorizontal: 16,
        paddingVertical: 3,
        borderRadius: 5,
    },
    buttonSave: {
        backgroundColor: cor.gray700,
        color: "#fff",
        fontSize: 15,
        fontWeight: font.medium,
        borderColor: cor.gray500,
        borderWidth: 0.5,
        paddingHorizontal: 16,
        paddingVertical: 3,
        borderRadius: 5,
    }
});
export default ScreenBottom