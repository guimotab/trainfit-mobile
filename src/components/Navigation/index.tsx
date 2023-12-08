import usePreferences from "../../state/hooks/usePreferences"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, View, Pressable } from "react-native"
import { cor, font } from "../../utils/presetStyles"
import { useEffect } from "react"
import Gear from 'react-native-vector-icons/FontAwesome'
import List from 'react-native-vector-icons/MaterialCommunityIcons'

const Navigation = () => {
    const preferences = usePreferences()
    const navigation = useNavigation()
    useEffect(() => {
        if (!preferences.initializer) {
            navigation.navigate("Welcome")
        }
    }, [])

    return (
        <View style={styles.section}>
            <View style={styles.sectionView}>
                <Pressable style={styles.pressable} onPress={event => navigation.navigate("Presets")}>
                    <List style={styles.icons} name="clipboard-list-outline" />
                    <Text style={styles.text}>Treinos</Text>
                </Pressable>
                <Pressable style={styles.pressable} onPress={event => navigation.navigate("Configuration")}>
                    <Gear style={styles.icons} name="gear" />
                    <Text style={styles.text}>Opções</Text>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    section: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: cor.terciaria,
        height: 63,
        paddingHorizontal: 32,
    },
    sectionView: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        maxWidth: 200,
        justifyContent: "space-between",
        alignItems: "center",
    },
    pressable: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    text: {
        fontWeight: font.medium,
        color: "#fff",
        fontSize: 17
    },
    icons: {
        color: "#fff",
        fontSize: 22
    }
})
export default Navigation