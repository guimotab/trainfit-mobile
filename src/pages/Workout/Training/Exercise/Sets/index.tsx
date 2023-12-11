import { Tables } from "../../../../../models/Tables";
import { MuscleGroup } from "../../../../../models/MuscleGroup";
import useTables from "../../../../../state/hooks/useTables";
import findCurrentTable from "../../../../../utils/findCurrentTable";
import { ISets } from "../../../../../shared/interfaces/ISets";
import { useEffect, useState } from "react";
import { useUpdateTables } from "../../../../../state/hooks/useUpdateTables";
import { IExercise } from "../../../../../shared/interfaces/IExercise";
import { IMuscleGroupInformations } from "../../../../../shared/interfaces/IMuscleGroupInformations";
import { AsyncStorager } from "../../../../../service/AsyncStorager";
import { IMuscleGroup } from "../../../../../shared/interfaces/IMuscleGroup";
import useWarningProgram from "../../../../../state/hooks/useWarningProgram";
import { useUpdateMessageProgram } from "../../../../../state/hooks/useUpdateMessageProgram";
import { useRoute } from "@react-navigation/native";
import { ParamsProps } from "../../../../../@types/navigation";
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput } from "react-native"
import { cor, font } from "../../../../../utils/presetStyles"
import { Picker } from "@react-native-picker/picker";
import Edit from "react-native-vector-icons/MaterialIcons"
import useIdSetsEdit from "../../../../../state/hooks/useIdSetsEdit";
import { useUpdateIdSetsEdit } from "../../../../../state/hooks/useUpdateIdSetsEdit";

export interface SetsProps {
    sets: ISets
    exercise: IExercise
    workout: IMuscleGroupInformations
    setSaveTable: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
    saveTable: IMuscleGroup[]
}
const Sets = ({ sets, exercise, workout, saveTable, setSaveTable }: SetsProps) => {
    const route = useRoute()
    const params = route.params as ParamsProps
    const id = params.id.toString()
    const tables = new Tables(useTables());
    const saveTables = new Tables(saveTable)
    const setTables = useUpdateTables()
    const updadeMessageProgram = useUpdateMessageProgram()
    const setIdSetsEdit = useUpdateIdSetsEdit()
    const warningProgram = useWarningProgram()
    const currentTable = new MuscleGroup(findCurrentTable(saveTable, id!))
    const [dateId, setDateId] = useState(workout.date + "%" + exercise.id + "%" + sets.numberSet)
    const [numberSet, setNumberSet] = useState(sets.numberSet)
    const [weight, setWeight] = useState(sets.weight)
    const [typeWeight, setTypeWeight] = useState(sets.typeWeight)
    const [repetitions, setRepetitions] = useState(sets.repetitions)
    const [advancedTechnique, setAdvancedTechnique] = useState(sets.advancedTechnique)
    const [observations, setObservations] = useState(sets.observations)

    useEffect(() => {
        setDateId(workout.date + "%" + exercise.id + "%" + sets.numberSet)
        setNumberSet(sets.numberSet)
        setWeight(sets.weight)
        setTypeWeight(sets.typeWeight)
        setRepetitions(sets.repetitions)
        setAdvancedTechnique(sets.advancedTechnique)
        setObservations(sets.observations)
    }, [sets])

    function saveInformations(newSets?: ISets) {
        if (!newSets) {
            newSets = { advancedTechnique, numberSet, observations, repetitions, typeWeight, weight }
        }
        if (warningProgram[0] === "") {
            currentTable.updateSets(dateId, newSets)
            tables.updateTables(currentTable)
            setTables(tables.tables)
            setSaveTable(tables.tables)
            AsyncStorager.saveTables(tables.tables)
        }
    }
    function deleteSet() {
        currentTable.deleteSets(dateId)
        saveTables.updateTables(currentTable)
        setSaveTable(saveTables.tables)
        updadeMessageProgram(["Há alterações feitas!"], "warning")
    }
    function verifyIsNumber(text: string, type: string) {
        if (type === "weight") {
            if (text === "") {
                setWeight(Number(text))
            } else {
                if (Number(text)) {
                    setWeight(Number(text))
                } else {
                    setWeight(weight)
                }
            }
        } else {
            if (text === "") {
                setRepetitions(Number(text))
            } else {
                if (Number(text)) {
                    setRepetitions(Number(text))
                } else {
                    setRepetitions(repetitions)
                }
            }
        }
    }
    function changeTypeWeight(thisTypeWeight: string) {
        setTypeWeight(thisTypeWeight),
            saveInformations({ advancedTechnique, numberSet, observations, repetitions, typeWeight: thisTypeWeight, weight })
    }
    const typeWeightArray = [
        "Kg",
        "Lb"
    ];
    const advancedTechniqueArray = [
        "Normal",
        "Rest-Pause",
        "Drop-Set",
        "Bi-Set",
        "Cluster-Set",
        "Super-Set"
    ];
    return (
        <View style={styles.section}>
            <View style={styles.viewSeries}>
                <Text style={styles.textSeries}>{numberSet}° Série</Text>
                {/* <Trash name="trash" size={18} onPress={event => deleteSet()} style={styles.icon} /> */}
                <Edit name="edit" size={21} onPress={event => setIdSetsEdit(exercise.name + "|" + sets.numberSet)} style={styles.icon} />
            </View>
            <View style={styles.viewGroup}>
                <View style={styles.viewInputTexts}>
                    <View style={styles.viewInputWeightRep}>
                        <Text style={styles.text}>Peso: </Text>
                        <Text style={styles.textInput}>{weight}</Text>
                    </View>
                    <View style={styles.viewInputTypeTech}>
                        <Text style={styles.text}>Medida: </Text>
                        <Text style={styles.textInput}>{typeWeight}</Text>
                    </View>
                </View>
                <View style={styles.viewInputTexts}>
                    <View style={styles.viewInputWeightRep}>
                        <Text style={styles.text}>Repetições: </Text>
                        <Text style={styles.textInput}>{repetitions}</Text>
                    </View>
                    <View style={styles.viewInputTypeTech}>
                        <Text style={styles.text}>Técnica Avançada: </Text>
                        <Text style={styles.textInput}>{advancedTechnique}</Text>
                    </View>
                </View>
                {observations !== "" ?
                    <View style={styles.viewInputObservation}>
                        <Text style={styles.text}>Observações: </Text>
                        <Text style={styles.textInput}>{observations}</Text>
                    </View>
                    : <></>
                }
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    section: {
        display: "flex",
        flexDirection: "column",
        borderWidth: 2,
        borderColor: cor.gray200,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        gap: 5,
    },
    viewSeries: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textSeries: {
        fontSize: 16,
        fontWeight: font.medium,
        color: cor.gray200
    },
    viewGroup: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        gap: 10,
        paddingHorizontal: 10
    },
    viewInputWeightRep: {
        width: "40%",
    },
    viewInputTypeTech: {
        width: "52%"
    },
    technique: {
        backgroundColor: cor.gray200,
        borderRadius: 8,
        height: 30
    },
    picker: {
        width: 145,
        position: "relative",
        left: -10,
        top: -11
    },
    viewInputTexts: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        alignItems: "center"
    },
    textInputRepetition: {
        backgroundColor: cor.gray200,
        fontWeight: font.medium,
        paddingLeft: 4,
        borderRadius: 8
    },
    viewInputObservation: {
        display: "flex",
        flex: 1,
    },
    inputObservation: {
        flex: 1,
        backgroundColor: cor.gray200,
        fontWeight: font.medium,
        paddingHorizontal: 8,
        borderRadius: 8
    },
    selectInput: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16
    },
    icon: {
        // w-5 h-5
        color: cor.gray200, //200,
        //hover: animate - hoverWH'
    },
    text: {
        color: cor.gray200,
        fontWeight: font.medium,
    },
    textInput: {
        backgroundColor: cor.gray200,
        textAlignVertical: "center",
        height: 25,
        fontWeight: font.medium,
        paddingLeft: 4,
        borderRadius: 8,
    },
});
export default Sets