import IconCardio from "../../../assets/svg/cardio.svg"
import IconHalter from "../../../assets/svg/cardio.svg"
import IconSupino from "../../../assets/svg/cardio.svg"
import IconLevantamentoTerra from "../../../assets/svg/cardio.svg"
import IconSeringa from "../../../assets/svg/cardio.svg"
import IconWhey from "../../../assets/svg/cardio.svg"
import { IMuscleGroup } from "../../shared/interfaces/IMuscleGroup"
import { Button, StyleSheet, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
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
            return <IconCardio style={styles.icons} />
        } else if (logo === "iconHalter") {
            return <IconHalter style={styles.icons} />
        } else if (logo === "iconSupino") {
            return <IconSupino style={styles.icons} />
        } else if (logo === "iconLevantamentoTerra") {
            return <IconLevantamentoTerra style={styles.icons} />
        } else if (logo === "iconSeringa") {
            return <IconSeringa style={styles.icons} />
        } else if (logo === "iconWhey") {
            return <IconWhey style={styles.icons} />
        } else if (logo === "GiWeightLiftingUp") {
            return <Icon name="weight-lifter" style={styles.icons} />
        }
    }
    return (
        <View style={styles.div}>
            <Button title="" onPress={event=>navigation.navigate("Workout", { id: table.id } )}/>
            {/* <Link
                to={`/treino/${table.id}`}
                key={table.id}
                onMouseEnter={event => changeColor("enter")}
                onMouseLeave={event => changeColor("leave")}
                style="flex flex-col gap-5 bg-gray-700 max-h-56 h-fit rounded-2xl hover:bg-gray-700 p-4 w-full cursor-pointer max-w-lg">
            </Link> */}
            <View
                id={`border-link-workout${table.id}`}
                style={styles.borderLink}>
                {renderIcons(table.logo)}
                <Text style={styles.h2}>{table.name}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    div: {
        display: "flex",
        justifyContent: "space-between"
    },
    borderLink: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "gray",//200
        paddingHorizontal: 3,
        paddingVertical: 2,
    },
    h2: {
        fontSize: 20,
        fontWeight: "600",
        color: "gray", //200
        paddingHorizontal: 5,
        paddingVertical: 3,
    },
    icons: {
        width: 50,
        height: 50,
        color: "gray", //400
    }
});
export default AllWorkouts