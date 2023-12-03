import { Tables } from "../../../../../models/Tables";
import { MuscleGroup } from "../../../../../models/MuscleGroup";
import useTables from "../../../../../state/hooks/useTables";
import findCurrentTable from "../../../../../utils/findCurrentTable";
import { ISets } from "../../../../../shared/interfaces/ISets";
import { useEffect, useState } from "react";
import { useUpdateTables } from "../../../../../state/hooks/useUpdateTables";
import { IExercise } from "../../../../../shared/interfaces/IExercise";
import { IMuscleGroupInformations } from "../../../../../shared/interfaces/IMuscleGroupInformations";
import { AsyncStorager } from "../../../../../service/LocalStorager";
import { IMuscleGroup } from "../../../../../shared/interfaces/IMuscleGroup";
import useWarningProgram from "../../../../../state/hooks/useWarningProgram";
import { useUpdateMessageProgram } from "../../../../../state/hooks/useUpdateMessageProgram";
import { useRoute } from "@react-navigation/native";
import { ParamsProps } from "../../../../../@types/navigation";
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput } from "react-native"
import { cor, font } from "../../../../../utils/presetStyles"
import Trash from "react-native-vector-icons/FontAwesome5"
import RNPickerSelect from "react-native-picker-select";

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

    function saveInformations() {
        if (warningProgram[0] === "") {
            currentTable.updateSets(dateId, { advancedTechnique, numberSet, observations, repetitions, typeWeight, weight })
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
            try {
                setWeight(Number(text))
            } catch {
                setWeight(weight)
            }
        } else {
            try {
                setRepetitions(Number(text))
            } catch {
                setRepetitions(repetitions)
            }
        }
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
                <Trash name="trash" size={20} onPress={event => deleteSet()} style={styles.icon} />
            </View>
            <View style={styles.viewGroup}>
                <View style={styles.viewInputTexts}>
                    <View style={styles.viewInputWeightRep}>
                        <Text style={styles.text}>Peso: </Text>
                        <TextInput
                            value={weight.toString()}
                            onChangeText={text => verifyIsNumber(text, "weight")}
                            onEndEditing={event => saveInformations()}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.viewInputTypeTech}>
                        <Text style={styles.text}>Medida: </Text>
                        <View style={styles.selectInput}>
                            <Text style={styles.text}>Kg</Text>
                            <Text style={styles.text}>Lg</Text>
                            {/* <RNPickerSelect
                                value={typeWeight}
                                onValueChange={(value) => setTypeWeight(value)}
                                items={[
                                    { label: 'Kg', value: 'Kg', color: "black" },
                                    { label: 'Lg', value: 'Lg', color: "black" }
                                ]}
                            /> */}
                        </View>
                    </View>
                </View>
                <View style={styles.viewInputTexts}>
                    <View style={styles.viewInputWeightRep}>
                        <Text style={styles.text}>Repetições: </Text>
                        <TextInput
                            value={repetitions.toString()}
                            maxLength={2}
                            style={styles.textInputRepetition}
                            onChangeText={text => verifyIsNumber(text, "repetitions")}
                            onEndEditing={event => saveInformations()}
                        />
                    </View>
                    <View style={styles.viewInputTypeTech}>
                        <Text style={styles.text}>Técnica Avançada: </Text>
                        <View style={styles.selectInput}>
                            <RNPickerSelect
                                value={advancedTechnique}
                                onValueChange={(value) => setAdvancedTechnique(value)}
                                items={advancedTechniqueArray.map((typeWeight) => {
                                    const teste = {
                                        label: typeWeight,
                                        value: typeWeight
                                    }
                                    return teste
                                })}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.viewInputObservation}>
                    <Text style={styles.text}>Observações: </Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={3}
                        maxLength={110}
                        style={styles.inputObservation}
                        value={observations}
                        onChangeText={text => setObservations(text)}
                        onEndEditing={event => saveInformations()} />
                </View>
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
        paddingHorizontal: 26,
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
        fontSize: 17,
        fontWeight: font.medium,
        color: cor.gray200
    },
    viewGroup: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        gap: 5,
        paddingLeft: 12
    },
    viewInputWeightRep: {
        width: "30%",
    },
    viewInputTypeTech: {
        width: "60%"
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
        gap: 12,
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
        borderRadius: 8,
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
        fontWeight: font.medium,
        paddingLeft: 4,
        borderRadius: 8,
    },
});
export default Sets