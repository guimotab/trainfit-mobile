import { MuscleGroup } from '../../../../models/MuscleGroup'
import { Tables } from '../../../../models/Tables'
import useTables from '../../../../state/hooks/useTables'
import findCurrentTable from '../../../../utils/findCurrentTable'
import { IMuscleGroupInformations } from '../../../../shared/interfaces/IMuscleGroupInformations'
import { useUpdateTables } from '../../../../state/hooks/useUpdateTables'
import { MuscleGroupInformation } from '../../../../models/MuscleGroupInformation'
import { IMuscleGroup } from '../../../../shared/interfaces/IMuscleGroup'
import useWarningProgram from '../../../../state/hooks/useWarningProgram'
import { useUpdateMessageProgram } from '../../../../state/hooks/useUpdateMessageProgram'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ParamsProps } from '../../../../@types/navigation'
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput } from "react-native"
import { cor, font } from '../../../../utils/presetStyles'
import Plus from "react-native-vector-icons/AntDesign"
import LaughBeam from "react-native-vector-icons/Fontisto"
import Smile from "react-native-vector-icons/Fontisto"
import Meh from "react-native-vector-icons/Fontisto"
import FrownOpen from "react-native-vector-icons/Fontisto"
import Frown from "react-native-vector-icons/Fontisto"
import Trash from "react-native-vector-icons/FontAwesome5"
import { AsyncStorager } from '../../../../service/AsyncStorager'
import { useEffect, useState } from 'react'

interface HeaderTraininProps {
    saveTable: IMuscleGroup[]
    workout: IMuscleGroupInformations
    setSaveTable: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
    setShowDeleteWorkout: React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderTraining = ({ saveTable, workout, setSaveTable, setShowDeleteWorkout }: HeaderTraininProps) => {
    const route = useRoute()
    const params = route.params as ParamsProps
    const id = params.id.toString()
    const setTables = useUpdateTables()
    const tables = new Tables(useTables())
    const saveTables = new Tables(saveTable)
    const updadeMessageProgram = useUpdateMessageProgram()
    let currentTable = new MuscleGroup(findCurrentTable(tables.tables, id.toString()!))
    const [date, setDate] = useState(workout.date)
    const [exercise, setExercise] = useState(workout.exercise)
    const [feeling, setFeeling] = useState(workout.feeling)
    const warningProgram = useWarningProgram()
    const navigation = useNavigation()
    useEffect(() => {
        currentTable = new MuscleGroup(findCurrentTable(tables.tables, id!))
        setDate(workout.date)
        setExercise(workout.exercise)
        setFeeling(workout.feeling)
    }, [tables.tables])
    function deleteWorkout() {
        setShowDeleteWorkout(true)
    }
    function changeFeeling(feelingType: string) {
        if (warningProgram[0] === "") {
            const feeling = feelingType
            setFeeling(feeling)
            currentTable.updateInformations(workout.date, { date, exercise, feeling })
            tables.updateTables(currentTable)
            setTables(tables.tables)
            setSaveTable(tables.tables)
            AsyncStorager.saveTables(tables.tables)
        }
    }
    function createNewExercise() {
        if (warningProgram[0] === "") {
            const workoutClass = new MuscleGroupInformation(workout)
            let idNewExercise: number
            if (workoutClass.exercise[0]) {
                idNewExercise = workoutClass.exercise[workoutClass.exercise.length - 1].id + 1
            } else {
                idNewExercise = 1
            }
            workoutClass.addNewExercise({ id: idNewExercise, name: "Novo Exercício " + idNewExercise, sets: [] })
            currentTable.updateInformations(workoutClass.date, workoutClass.returnInformation())
            tables.updateTables(currentTable)
            setTables(tables.tables)
            setSaveTable(tables.tables)
            AsyncStorager.saveTables(tables.tables)
        }
    }
    const feelings = [
        {
            JSX: LaughBeam,
            name: "smiley",
            id: "muitoBem",
            onPress: () => changeFeeling("muitoBem"),
            style: feeling === "muitoBem" ? { color: "#22c55e" } : { color: cor.gray300 }
        }, {
            JSX: Smile,
            name: "slightly-smile",
            id: "bem",
            onPress: () => changeFeeling("bem"),
            style: feeling === "bem" ? { color: "#eab308" } : { color: cor.gray300 }
        }, {
            JSX: Meh,
            name: "neutral",
            id: "normal",
            onPress: () => changeFeeling("normal"),
            style: feeling === "normal" ? { color: "#60a5fa" } : { color: cor.gray300 }
        }, {
            JSX: FrownOpen,
            name: "expressionless",
            id: "mal",
            onPress: () => changeFeeling("mal"),
            style: feeling === "mal" ? { color: "#f97316" } : { color: cor.gray300 }
        }, {
            JSX: Frown,
            name: "frowning",
            id: "muitoMal",
            onPress: () => changeFeeling("muitoMal"),
            style: feeling === "muitoMal" ? { color: "#b91c1c" } : { color: cor.gray300 }
        },
    ]

    return (
        <View style={styles.section}>
            <View style={styles.viewHeader}>
                <Text style={styles.textHeader}>{workout.date}</Text>
                <Pressable style={styles.pressablePlus} onPress={event => createNewExercise()}>
                    <Plus name={"pluscircleo"} size={18} style={styles.icon} />
                    <Text style={styles.textButton}>Exercício</Text>
                </Pressable>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <View style={styles.textEmoteGroup}>
                    <Text style={styles.textEmote}>Como você está hoje?</Text>
                    <View style={styles.emoteView}>
                        {feelings.map(feeling =>
                            <feeling.JSX
                                name={feeling.name}
                                key={feeling.id}
                                data-change
                                id={feeling.id}
                                size={20}
                                onPress={event => feeling.onPress()}
                                style={feeling.style} />
                        )}
                    </View>
                </View>
                <Pressable style={styles.pressableDelete} onPress={event => deleteWorkout()}>
                    <Trash name="trash" size={15} style={styles.icon} />
                    <Text style={styles.textButtonDelete}>Excluir</Text>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    section: {
        display: "flex",
        marginHorizontal: 20,
        gap: 8
    },
    viewHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    pressablePlus: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 7,
        backgroundColor: cor.secundaria,
        flexDirection: "row",
        alignItems: "center",
        gap: 7
    },
    pressableDelete: {
        marginTop: 15,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 7,
        alignSelf: "flex-start",
        backgroundColor: cor.deleteHover,
        flexDirection: "row",
        alignItems: "center",
        gap: 7
    },
    textHeader: {
        color: cor.gray200,
        fontWeight: font.semibold,
        fontSize: 22
    },
    textButton: {
        color: cor.gray200,
        fontWeight: font.semibold,
        fontSize: 16
    },
    textButtonDelete: {
        color: cor.gray200,
        fontWeight: font.semibold,
        fontSize: 15
    },
    textEmoteGroup: {
        display: "flex",
        gap: 8
    },
    textEmote: {
        color: cor.gray200,
        fontSize: 16
    },
    emoteView: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        color: cor.gray400,
    },
    icon: {
        color: cor.gray200, //200,
        //hover: animate - hoverWH'
    },
})
export default HeaderTraining