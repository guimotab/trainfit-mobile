import { useUpdatePreferences } from "../../../state/hooks/useUpdatePreferences"
import { useUpdateTables } from "../../../state/hooks/useUpdateTables"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet, View, Text, Alert } from "react-native"
import { cor, font } from "../../../utils/presetStyles";
import { FileSystemTrainFit } from "../../../service/FileSystem";
import { IMuscleGroup } from "../../../shared/interfaces/IMuscleGroup";
import { IPreferences } from "../../../shared/interfaces/IPreferences";

interface WarningUploadProps {
    showWarning: boolean
    setShowWarning: React.Dispatch<React.SetStateAction<boolean>>
}
const WarningUpload = ({ showWarning, setShowWarning }: WarningUploadProps) => {
    const navigation = useNavigation()
    const setPreferences = useUpdatePreferences()
    const setTable = useUpdateTables()
    async function deleteAll() {
        const [tables, preferences] = await FileSystemTrainFit.uploadFile() as [IMuscleGroup[], IPreferences]
        setShowWarning(false)
        if (tables.length > 0) {
            setTable(tables)
            setPreferences(preferences)
            navigation.navigate("Home")
            Alert.alert('Dados Alterados', 'Seus dados foram alterados com sucesso.');
        }
    }
    function cancelDelete() {
        setShowWarning(false)
    }
    return (
        <>
            {showWarning ?
                <>
                    <View style={styles.absolute} />
                    <View style={styles.section}>
                        <View style={styles.viewSection}>
                            <View style={styles.viewText}>
                                <Text style={styles.text}>{`Você perderá suas informações atuais.`}</Text>
                                <Text style={styles.text}>{`Salve antes de fazer o upload.`}</Text>
                            </View>
                            <View style={styles.viewButton}>
                                <Text onPress={event => deleteAll()} style={styles.buttonDelete}
                                >Continuar</Text>
                                <Text onPress={event => cancelDelete()} style={styles.buttonSave}
                                >Voltar</Text>
                            </View>
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
        backgroundColor: "#fff",
        opacity: 0.05
    },
    section: {
        zIndex: 30,
        display: "flex",
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    viewSection: {
        display: "flex",
        position: "absolute",
        alignItems: "center",
        width: "92%",
        maxHeight: 130,
        top: 300,
        gap: 15,
        borderColor: cor.gray400,
        borderWidth: 0.5,
        backgroundColor: cor.gray900,
        borderRadius: 8,
        paddingVertical: 15,

    },
    viewText: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    text: {
        color: cor.gray200,
        fontSize: 19,
        textAlign: "center",
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

export default WarningUpload