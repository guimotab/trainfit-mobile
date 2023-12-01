import IconCardio from "../../../../../assets/svg/cardio.svg"
import IconBiceps from "../../../../../assets/svg/biceps.svg"
import IconHalter from "../../../../../assets/svg/halter.svg"
import IconSupino from "../../../../../assets/svg/supino.svg"
import IconLevantamentoTerra from "../../../../../assets/svg/levantamentoTerra.svg"
import IconSeringa from "../../../../../assets/svg/seringa.svg"
import IconWhey from "../../../../../assets/svg/whey.svg"
import { IPreferencesWorkout } from "../../../../shared/interfaces/IPreferencesWorkout"
import findCurrentTable from "../../../../utils/findCurrentTable"
import useTables from "../../../../state/hooks/useTables"
import { Tables } from "../../../../models/Tables"
import { MuscleGroup } from "../../../../models/MuscleGroup"
import { useUpdateTables } from "../../../../state/hooks/useUpdateTables"
import { ScrollView, Button, StyleSheet, Text, View } from "react-native"
import { cor, font } from "../../../../utils/presetStyles"
import Weight  from 'react-native-vector-icons/MaterialCommunityIcons'
interface StylesProps {
    preference: IPreferencesWorkout
}

const Styles = ({ preference }: StylesProps) => {
    const tables = new Tables(useTables())
    const setTables = useUpdateTables()
    const currentTable = new MuscleGroup(findCurrentTable(tables.tables, preference.id.toString()))
    function chooseIcon(idIcon: string) {
        const elements = document.querySelectorAll("[data-iconWorkout]") as NodeListOf<HTMLElement>
        elements.forEach(element => {
            if (element.id === idIcon) {
                element.classList.add("text-cor-hover")
                element.classList.remove("text-gray-500")
                element.classList.remove("hover:text-gray-300")
            } else if (element.dataset.iconWorkout === preference.nameMuscleGroup) {
                element.classList.remove("text-cor-hover")
                element.classList.add("text-gray-500")
                element.classList.add("hover:text-gray-300")
            }
        })
        const result = idIcon.split("-")
        let logo = result[0] + result[1]
        if (result[1] === "weight") {
            logo = result[1] + result[2]
        } else if(result[1] === "bolt"){
            logo = result[1]
        }
        currentTable.logo = logo
        tables.updateTables(currentTable)
        setTables(tables.tables)
    }
    const icons = [
        {
            icon: IconCardio,
            name: "",
            id: `icon-Cardio-${preference.nameMuscleGroup}`,
            onPress: () => chooseIcon(`icon-Cardio-${preference.nameMuscleGroup}`),
            style: styles.icon
        }, {
            icon: IconBiceps,
            name: "",
            id: `icon-biceps-${preference.nameMuscleGroup}`,
            onClick: () => chooseIcon(`icon-biceps-${preference.nameMuscleGroup}`),
            style: styles.icon
        },{
            icon: IconHalter,
            name: "",
            id: `icon-Halter-${preference.nameMuscleGroup}`,
            onPress: () => chooseIcon(`icon-Halter-${preference.nameMuscleGroup}`),
            style: styles.icon
        }, {
            icon: IconSupino,
            name: "",
            id: `icon-Supino-${preference.nameMuscleGroup}`,
            onPress: () => chooseIcon(`icon-Supino-${preference.nameMuscleGroup}`),
            style: styles.icon
        }, {
            icon: IconLevantamentoTerra,
            name: "",
            id: `icon-LevantamentoTerra-${preference.nameMuscleGroup}`,
            onPress: () => chooseIcon(`icon-LevantamentoTerra-${preference.nameMuscleGroup}`),
            style: styles.icon
        }, {
            icon: IconSeringa,
            name: "",
            id: `icon-Seringa-${preference.nameMuscleGroup}`,
            onPress: () => chooseIcon(`icon-Seringa-${preference.nameMuscleGroup}`),
            style: styles.icon
        }, {
            icon: IconWhey,
            name: "",
            id: `icon-Whey-${preference.nameMuscleGroup}`,
            onPress: () => chooseIcon(`icon-Whey-${preference.nameMuscleGroup}`),
            style: styles.icon
        }, {
            icon: Weight,
            name: "weight-lifter",
            id: `icon-weight-lifter-${preference.nameMuscleGroup}`,
            onPress: () => chooseIcon(`icon-weight-lifter-${preference.nameMuscleGroup}`),
            style: styles.icon
        },
    ]
    return (
        <View style={styles.section}>
            <View style={styles.sectionView}>
                <View style={styles.titleGroup}>
                    <Text style={styles.text} >
                        {preference.nameMuscleGroup}
                    </Text>
                </View>
                <View style={styles.divExerciseInput}>
                    {icons.map(icon =>
                        <View key={icon.id} style={styles.viewIcon}>
                            <icon.icon
                                width={50}
                                height={50}
                                name={icon.name}
                                data-iconWorkout={preference.nameMuscleGroup}
                                id={icon.id}
                                onPress={icon.onPress}
                                style={icon.style}
                            />
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    section: {
        display: "flex",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    sectionView: {
        display: "flex",
        flexDirection: "column",
        borderWidth: 2,
        borderColor: cor.secundaria,
        borderRadius: 10,
        paddingHorizontal: 24,
        paddingVertical: 8,
        gap: 12
    },
    titleGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    text: {
        paddingHorizontal: 4,
        backgroundColor: "transparent",
        color: cor.gray200,
        fontWeight: font.medium,
        fontSize: 20
    },
    divExerciseInput: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 8,
        paddingBottom: 12
    },
    viewIcon: {
        //flex justify-center"
        display: "flex",
        justifyContent: "center"
    },
    icon: {
        fontSize: 50,
        width: 50,
        height: 50,
        color: cor.gray500, //200,
        //hover: animate - hoverWH'
    },
})
export default Styles