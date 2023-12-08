import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native"
import { cor, font } from "../../../utils/presetStyles";
import Actions from 'react-native-vector-icons/Ionicons'
import { FileSystemTrainFit } from "../../../service/FileSystem";
import { IMuscleGroup } from "../../../shared/interfaces/IMuscleGroup";
import { IPreferences } from "../../../shared/interfaces/IPreferences";
import { useNavigation } from "@react-navigation/native";
import { useUpdatePreferences } from "../../../state/hooks/useUpdatePreferences";
import { useUpdateTables } from "../../../state/hooks/useUpdateTables";

const UploadDownloadInformation = () => {
    const setTable = useUpdateTables()
    const setPreferences = useUpdatePreferences()
    const navigation = useNavigation()
    async function downloadInformations() {
        await FileSystemTrainFit.downloadFile()
    }
    async function uploadInformation() {
        const [tables, preferences] = await FileSystemTrainFit.uploadFile() as [IMuscleGroup[], IPreferences]
        if (tables.length > 0) {
            setTable(tables)
            setPreferences(preferences)
            navigation.navigate("Home")
        }
    }
    return (
        <>
            <View style={styles.sectionView}>
                <View>
                    <Text style={styles.textTrain}>Suas Informações</Text>
                    <Text style={{ color: cor.gray200 }}>Baixe ou faça upload de suas informações!</Text>
                </View>
                <View style={styles.viewSave}>
                    <Pressable style={styles.button}
                        onPress={event => downloadInformations()}>
                        <Actions name="cloud-download-outline" style={{ fontSize: 22, color: "#fff" }} />
                        <Text style={styles.textButton}>Fazer Download</Text>
                    </Pressable>
                    <Pressable style={styles.button}
                        onPress={event => uploadInformation()}>
                        <Actions name="cloud-upload-outline" style={{ fontSize: 22, color: "#fff" }} />
                        <Text style={styles.textButton}>Fazer Upload</Text>
                    </Pressable>
                </View>
            </View >
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
        opacity: 0.09
    },
    loading: {
        position: "absolute",
        width: 50,
        height: 50,
        borderRightColor: "#fff",
        borderTopColor: "#fff",
        borderBottomColor: "#fff",
        borderLeftColor: cor.secundaria,
        borderWidth: 6,
    },
    sectionView: {
        display: "flex",
        flexDirection: "column",
        marginTop: 15,
        gap: 15,
    },
    textTrain: {
        fontWeight: font.bold,
        fontSize: 20,
        color: cor.gray200
    },
    viewSave: {
        color: cor.gray200,
        fontWeight: font.medium,
        fontSize: 16,
        borderRadius: 8,
        gap: 20
    },
    button: {
        display: 'flex',
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        alignSelf: "flex-start",
        borderColor: cor.gray600,
        borderWidth: 1,
        paddingHorizontal: 13,
        paddingVertical: 6,
        borderRadius: 6,
        backgroundColor: cor.gray800
    },
    textButton: {
        color: cor.gray200,
        fontWeight: font.semibold,
        fontSize: 15,
    }

});
export default UploadDownloadInformation