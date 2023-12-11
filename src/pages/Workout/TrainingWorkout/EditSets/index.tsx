import { StyleSheet, View, Pressable, TextInput, Text } from "react-native"
import { MuscleGroup } from "../../../../models/MuscleGroup"
import { IMuscleGroup } from "../../../../shared/interfaces/IMuscleGroup"
import { IMuscleGroupInformations } from "../../../../shared/interfaces/IMuscleGroupInformations"
import { cor, font } from "../../../../utils/presetStyles"
import Trash from "react-native-vector-icons/FontAwesome5"
import Check from "react-native-vector-icons/FontAwesome5"
import useIdSetsEdit from "../../../../state/hooks/useIdSetsEdit"
import { useState } from "react"
import findCurrentSet from "../../../../utils/findCurrentSet"
import findCurrentExercise from "../../../../utils/findCurrentExercise"
import { Picker } from "@react-native-picker/picker"
import { AsyncStorager } from "../../../../service/AsyncStorager"
import { ISets } from "../../../../shared/interfaces/ISets"
import { warningProgram } from "../../../../state/atom"
import { Tables } from "../../../../models/Tables"
import useTables from "../../../../state/hooks/useTables"
import { useUpdateTables } from "../../../../state/hooks/useUpdateTables"
import { useUpdateMessageProgram } from "../../../../state/hooks/useUpdateMessageProgram"

interface EditSetsProps {
    currentTable: MuscleGroup
    workout: IMuscleGroupInformations
    saveTable: IMuscleGroup[]
    setSaveTable: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
}
const EditSets = ({ saveTable, currentTable, workout, setSaveTable }: EditSetsProps) => {
    const allIdSet = useIdSetsEdit()
    const nameExercise = allIdSet.split("|")[0]
    const idSet = allIdSet.split("|")[1]
    const tables = new Tables(useTables());
    const saveTables = new Tables(saveTable)
    const setTables = useUpdateTables()
    const currentExercise = findCurrentExercise(workout, nameExercise)
    const sets = findCurrentSet(currentExercise, Number(idSet))
    const [changed, setChanged] = useState(false)
    const [dateId, setDateId] = useState(workout.date + "%" + currentExercise.id + "%" + sets.numberSet)
    const [stringError, setStringError] = useState("")
    const [numberSet, setNumberSet] = useState(sets.numberSet)
    const [weight, setWeight] = useState(sets.weight)
    const [typeWeight, setTypeWeight] = useState(sets.typeWeight)
    const [repetitions, setRepetitions] = useState(sets.repetitions)
    const [advancedTechnique, setAdvancedTechnique] = useState(sets.advancedTechnique)
    const [observations, setObservations] = useState(sets.observations)
    const updadeMessageProgram = useUpdateMessageProgram()
    function saveInformations(newSets?: ISets) {
        if (!newSets) {
            newSets = { advancedTechnique, numberSet, observations, repetitions, typeWeight, weight }
        }
        // if (warningProgram[0] === "") {
        currentTable.updateSets(dateId, newSets)
        tables.updateTables(currentTable)
        setTables(tables.tables)
        setSaveTable(tables.tables)
        AsyncStorager.saveTables(tables.tables)
        // }
    }
    function deleteSet() {
        currentTable.deleteSets(dateId)
        saveTables.updateTables(currentTable)
        setSaveTable(saveTables.tables)
        updadeMessageProgram(["Há alterações feitas!"], "warning")
        setStringError("")
    }
    function changeTypeWeight(thisTypeWeight: string) {
        setChanged(true)
        setTypeWeight(thisTypeWeight)
        saveInformations({ advancedTechnique, numberSet, observations, repetitions, typeWeight: thisTypeWeight, weight })
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
    function wasChanged() {
        if (!changed) {
            if (numberSet !== sets.numberSet || weight !== sets.weight || typeWeight !== sets.typeWeight || repetitions !== sets.repetitions || advancedTechnique !== sets.advancedTechnique || observations !== sets.observations) {
                setChanged(true)
            }
        }
    }
    return (
        <View style={styles.section}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
                    <Text style={styles.textEdit}>Editar Série</Text>
                    <Pressable style={nameExercise === nameExercise ? styles.pressableSave : styles.pressableSaveChanged} onPress={event => saveInformations()}>
                        <Check name="check" size={16} style={styles.icon} />
                        <Text style={{ color: cor.gray200, fontSize: 15, fontWeight: font.semibold }}>Salvar</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.pressableExclude} onPress={event => deleteSet()}>
                    <Trash name="trash" size={16} style={styles.icon} />
                    <Text style={{ color: cor.gray200, fontSize: 15, fontWeight: font.semibold }}>Excluir</Text>
                </Pressable>
            </View>
            <View style={styles.section}>
                <View style={styles.viewInputTexts}>
                    <View style={styles.viewInputWeightRep}>
                        <Text style={styles.text}>Peso: </Text>
                        <TextInput
                            maxLength={4}
                            value={weight.toString()}
                            onChangeText={text => verifyIsNumber(text, "weight")}
                            onEndEditing={event => wasChanged()}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.viewInputTypeTech}>
                        <Text style={styles.text}>Medida: </Text>
                        <View style={styles.selectInput}>
                            {typeWeightArray.map(thisTypeWeight =>
                                <Text key={thisTypeWeight}
                                    onPress={event => (changeTypeWeight(thisTypeWeight))}
                                    style={typeWeight === thisTypeWeight ? { color: cor.gray200, fontWeight: font.medium, fontSize: 15 } : { color: cor.gray400, fontWeight: font.medium, fontSize: 15 }}>{thisTypeWeight}</Text>)
                            }
                        </View>
                    </View>
                </View>
                <View style={styles.viewInputTexts}>
                    <View style={styles.viewInputWeightRep}>
                        <Text style={styles.text}>Repetições: </Text>
                        <TextInput
                            value={repetitions.toString()}
                            maxLength={3}
                            style={styles.textInputRepetition}
                            onChangeText={text => verifyIsNumber(text, "repetitions")}
                            onEndEditing={event => wasChanged()}
                        />
                    </View>
                    <View style={styles.viewInputTypeTech}>
                        <Text style={styles.text}>Técnica Avançada: </Text>
                        <View style={styles.technique}>
                            <Picker
                                style={styles.picker}
                                selectedValue={advancedTechnique}
                                onValueChange={(itemValue, itemIndex) => saveInformations({ advancedTechnique: itemValue, numberSet, observations, repetitions, typeWeight, weight })}>
                                {advancedTechniqueArray.map((technique, index) =>
                                    <Picker.Item key={index} label={technique} value={technique} />)
                                }
                            </Picker>
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
                        onEndEditing={event => wasChanged()} />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    section: {
        zIndex: 30,
        gap: 15,
        display: "flex",
        justifyContent: "center",
        paddingBottom: 10,
        paddingTop: 8,
    },
    viewSection: {
        paddingLeft: 15,
        gap: 2,
        width: 300,
    },
    textEdit: {
        color: cor.gray200,
        fontSize: 17,
        fontWeight: font.medium
    },
    pressableSave: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        backgroundColor: cor.gray500,
        borderRadius: 7,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    pressableSaveChanged: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        backgroundColor: cor.secundaria,
        borderRadius: 7,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    pressableExclude: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        backgroundColor: cor.deleteHover,
        borderRadius: 7,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    textInput: {
        backgroundColor: cor.gray200,
        fontWeight: font.medium,
        paddingLeft: 4,
        borderRadius: 8
    },
    textError: {
        position: "absolute",
        paddingHorizontal: 15,
        bottom: -18,
        color: cor.erro,
        fontSize: 14,
        fontWeight: font.medium
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
        width: 210,
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
    },
    inputObservation: {
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
        fontSize: 15,
        fontWeight: font.medium,
    },
});
export default EditSets