import { ISets } from "../../../../../shared/interfaces/ISets";
import { useEffect, useState } from "react";
import { IExercise } from "../../../../../shared/interfaces/IExercise";
import { IMuscleGroupInformations } from "../../../../../shared/interfaces/IMuscleGroupInformations";
import { StyleSheet, Text, View } from "react-native"
import { cor, font } from "../../../../../utils/presetStyles"
import Edit from "react-native-vector-icons/MaterialIcons"
import { useUpdateIdSetsEdit } from "../../../../../state/hooks/useUpdateIdSetsEdit";

export interface SetsProps {
    sets: ISets
    exercise: IExercise
    workout: IMuscleGroupInformations
}
const Sets = ({ sets, exercise, workout }: SetsProps) => {
    const setIdSetsEdit = useUpdateIdSetsEdit()
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
    return (
        <View style={styles.section}>
            <View style={styles.viewSeries}>
                <Text style={styles.textSeries}>{numberSet}° Série</Text>
                <Edit name="edit" size={21} onPress={event => setIdSetsEdit(exercise.name + "|" + sets.numberSet)} style={styles.icon} />
            </View>
            <View style={styles.viewGroup}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <Text style={styles.textInput}>{weight}</Text>
                        <Text style={styles.textInput}>{typeWeight}</Text>
                    </View>
                    <Text style={styles.textInput}>X</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <Text style={styles.textInput}>{repetitions}</Text>
                        <Text style={styles.text}>reps</Text>
                    </View>
                    <Text style={styles.textInput}> | </Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <Text style={styles.text}>Técnica</Text>
                        <Text style={styles.textInput}>{advancedTechnique}</Text>
                    </View>
                </View>
                {observations !== "" ?
                    <View style={{ flexDirection: "row", gap: 4 }}>
                        <Text style={styles.text}>Obs: </Text>
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
        fontWeight: font.medium,
    },
    textInput: {
        color: cor.gray200,
        fontWeight: font.medium,
        flexShrink: 1
    },
});
export default Sets