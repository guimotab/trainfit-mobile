import IconCardio from "../../../assets/svg/cardio.svg"
import IconHalter from "../../../assets/svg/halter.svg"
import IconSupino from "../../../assets/svg/supino.svg"
import IconLevantamentoTerra from "../../../assets/svg/levantamentoTerra.svg"
import IconSeringa from "../../../assets/svg/seringa.svg"
import IconWhey from "../../../assets/svg/whey.svg"
import IconBiceps from "../../../assets/svg/biceps.svg"
import { IMuscleGroup } from "../../shared/interfaces/IMuscleGroup"
import { Pressable, Button, StyleSheet, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Weight from "react-native-vector-icons/MaterialCommunityIcons"
import { cor } from "../../utils/presetStyles"
interface AllWorkoutsProps {
    table: IMuscleGroup
}

const AllWorkouts = ({ table }: AllWorkoutsProps) => {
    const navigation = useNavigation()
    function changeColor(type: string) {
        const borderLink = document.getElementById(`border-link-workout${table.id}`)!
        if (type === "enter") {
            borderLink.classList.remove("border-gray-200")
            borderLink.classList.add("animate-hoverBorderWH")
        } else if ("leave") {
            borderLink.classList.remove("animate-hoverBorderWH")
            borderLink.classList.add("border-gray-200")
        }
    }
    function renderIcons(logo: string) {
        if (logo === "iconCardio") {
            return <IconCardio width={40} height={40} style={styles.icons} />
        } else if (logo === "iconHalter") {
            return <IconHalter width={40} height={40} style={styles.icons} />
        } else if (logo === "iconSupino") {
            return <IconSupino width={40} height={40} style={styles.icons} />
        } else if (logo === "iconLevantamentoTerra") {
            return <IconLevantamentoTerra width={40} height={40} style={styles.icons} />
        } else if (logo === "iconSeringa") {
            return <IconSeringa width={40} height={40} style={styles.icons} />
        } else if (logo === "iconWhey") {
            return <IconWhey width={40} height={40} style={styles.icons} />
        } else if (logo === "weight") {
            return <Weight name="weight-lifter" style={styles.icons} />
        } else if (logo === "iconBiceps") {
            return <IconBiceps width={40} height={40} style={styles.icons} />
        }
    }
    return (
        <Pressable
            id={`border-link-workout${table.id}`}
            style={styles.pressable}
            onPress={event => navigation.navigate("Workout", { id: table.id })}>
            <View style={styles.pressableView}>
                {renderIcons(table.logo)}
                <Text style={styles.text}>{table.name}</Text>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    pressable: {
        display: "flex",
        alignItems: "center",
        minWidth: "47%",
        maxWidth: "47%",
        minHeight: 130,
        maxHeight: 130,
        borderRadius: 12,
        color: cor.gray200,//200
        backgroundColor: cor.gray700,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    pressableView: {
        display: "flex",
        minWidth: "100%",
        flex: 1,
        gap: 6,
        justifyContent: "center",
        borderColor: cor.gray200,
        paddingHorizontal: 10,
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 2,
    },
    text: {
        fontSize: 17,
        fontWeight: "600",
        color: cor.gray200, //200
    },
    icons: {
        fontSize: 45,
        width: 45,
        height: 45,
        color: cor.gray400, //400
    }
});
export default AllWorkouts