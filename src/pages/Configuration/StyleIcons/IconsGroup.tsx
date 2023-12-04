import IconCardio from "../../../../assets/svg/cardio.svg"
import IconBiceps from "../../../../assets/svg/biceps.svg"
import IconHalter from "../../../../assets/svg/halter.svg"
import IconSupino from "../../../../assets/svg/supino.svg"
import IconLevantamentoTerra from "../../../../assets/svg/levantamentoTerra.svg"
import IconSeringa from "../../../../assets/svg/seringa.svg"
import IconWhey from "../../../../assets/svg/whey.svg"
import { MuscleGroup } from "../../../models/MuscleGroup"
import { Tables } from "../../../models/Tables"
import findCurrentTable from "../../../utils/findCurrentTable"
import { IMuscleGroup } from "../../../shared/interfaces/IMuscleGroup"
import { useState } from "react"
import { StyleSheet, Text, View, Pressable } from "react-native"
import { cor, font } from "../../../utils/presetStyles"
import Weight from 'react-native-vector-icons/MaterialCommunityIcons'
import useTables from "../../../state/hooks/useTables"

interface IconsGroupProps {
    table: IMuscleGroup
    setSaveTable: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
}

const IconsGroup = ({ table, setSaveTable }: IconsGroupProps) => {
    const tables = new Tables(useTables())
    const saveTables = new Tables(tables.tables)
    const currentTable = new MuscleGroup(findCurrentTable(tables.tables, table.id.toString()))
    const [iconTable, setIconTable] = useState(currentTable.logo)

    function chooseIcon(idIcon: string) {
        const result = idIcon.split("-")
        let logo = result[0] + result[1]
        setIconTable(logo)
        if (result[1] === "weight") {
            logo = result[1]
        }
        currentTable.logo = logo
        saveTables.updateTables(currentTable)
        setSaveTable(saveTables.tables)
    }
    const icons = [
        {
            icon: IconCardio,
            name: "",
            id: `icon-Cardio-${table.name}`,
            onPress: () => chooseIcon(`icon-Cardio-${table.name}`),
        }, {
            icon: IconHalter,
            name: "",
            id: `icon-Halter-${table.name}`,
            onPress: () => chooseIcon(`icon-Halter-${table.name}`),
        }, {
            icon: IconBiceps,
            name: "",
            id: `icon-Biceps-${table.name}`,
            onPress: () => chooseIcon(`icon-Biceps-${table.name}`),
        }, {
            icon: IconSupino,
            name: "",
            id: `icon-Supino-${table.name}`,
            onPress: () => chooseIcon(`icon-Supino-${table.name}`),
        }, {
            icon: IconLevantamentoTerra,
            name: "",
            id: `icon-LevantamentoTerra-${table.name}`,
            onPress: () => chooseIcon(`icon-LevantamentoTerra-${table.name}`),
        }, {
            icon: IconSeringa,
            name: "",
            id: `icon-Seringa-${table.name}`,
            onPress: () => chooseIcon(`icon-Seringa-${table.name}`),
        }, {
            icon: IconWhey,
            name: "",
            id: `icon-Whey-${table.name}`,
            onPress: () => chooseIcon(`icon-Whey-${table.name}`),
        }, {
            icon: Weight,
            name: "weight-lifter",
            id: `icon-weight-lifter-${table.name}`,
            onPress: () => chooseIcon(`icon-weight-lifter-${table.name}`),
        },
    ]
    return (
        <View style={styles.section}>
            <View style={styles.sectionView}>
                <View style={styles.textGroup}>
                    <Text style={styles.text} >
                        {table.name}
                    </Text>
                </View>
                <View style={styles.viewIconsGroup}>
                    {icons.map(icon =>
                        <View key={icon.id} style={styles.viewIcons}>
                            <icon.icon
                                name={icon.name}
                                width={35}
                                height={35}
                                data-iconWorkout={table.name}
                                id={icon.id}
                                onPress={icon.onPress}
                                style={iconTable === "icon" + icon.id.split("-")[1] || iconTable === icon.id.split("-")[1] ?
                                    styles.styleIcon1 : styles.styleIcon2}
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
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 12,
    },
    sectionView: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        borderWidth: 2,
        borderColor: cor.secundaria,
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 20,
    },
    textGroup: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
    },
    text: {
        fontWeight: font.medium,
        textAlign: "center",
        fontSize: 20,
        color: cor.gray200,
        backgroundColor: "transparent"
    },
    viewIconsGroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        flex: 1,
        flexWrap: "wrap",
        paddingHorizontal: 20,
        paddingBottom: 10,
        columnGap: 30,
        rowGap: 15
    },
    viewIcons: {
        display: "flex",
        justifyContent: "center",
    },
    styleIcon1: {
        color: cor.hover,
        fontSize: 36,
        height: 36,
        width: 36
    },
    styleIcon2: {
        color: cor.gray500,
        fontSize: 36,
        height: 36,
        width: 36
    }
});
export default IconsGroup