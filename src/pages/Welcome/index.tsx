import Icon from 'react-native-vector-icons/AntDesign'
import useTables from '../../state/hooks/useTables'
import { useUpdateTables } from '../../state/hooks/useUpdateTables'
import usePreferences from '../../state/hooks/usePreferences'
import { useUpdatePreferences } from '../../state/hooks/useUpdatePreferences'
import {ScrollView, Button, StyleSheet, Text, View } from "react-native"
import { Tables } from '../../models/Tables'
import InputNameMuscles from './InputNameMuscles'
import { IPreferencesWorkout } from '../../shared/interfaces/IPreferencesWorkout'
import { AllPreferences } from '../../models/AllPreferences'
import ErrorProgram from '../../components/ErrorProgram'
import useErrorProgram from '../../state/hooks/useErrorProgram'
import { useNavigation } from '@react-navigation/native'
import { cor, font } from '../../utils/presetStyles'

const Welcome = () => {
    const tables = new Tables(useTables())
    const setTables = useUpdateTables()
    const preferences = new AllPreferences(usePreferences())
    const setPreferences = useUpdatePreferences()
    const erroProgram = useErrorProgram()
    const navigation = useNavigation()

    function addNewMuscularGroup() {
        let newId: number
        if (tables.tables[0]) {
            newId = tables.tables[tables.tables.length - 1].id + 1
        } else {
            newId = 1
        }
        const newPreference = {
            id: newId,
            nameMuscleGroup: "Novo Grupo " + newId,
            basesExercises: []
        } as IPreferencesWorkout
        tables.addNewTable(newPreference.id, newPreference.nameMuscleGroup, [])
        preferences.pushPreference(newPreference)
        setPreferences(preferences.returnInformation())
        setTables(tables.tables)
    }

    return (
        <View style={styles.section}>
            <ScrollView>
                <View style={styles.divWelcome}>
                    <View style={styles.divTextWelcome}>
                        <Text style={styles.inicialText}>Olá! Bem vindo ao <Text style={styles.boldText}>TrainFit!</Text></Text>
                        <View style={styles.viewDivH2}>
                            <View style={styles.viewH2}>
                                <Text style={styles.h2}>Crie sua divisão de grupos musculares</Text>
                                <Icon name={"pluscircleo"} size={23} onPress={event => addNewMuscularGroup()} style={styles.icon} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.divInputButton}>
                        <View style={styles.viewTables}>
                            {tables.tables.map(table => <InputNameMuscles key={table.id} table={table} />)}
                        </View>
                        <View style={styles.viewTextButtons}>
                            {tables.tables[0] ?
                                <Text
                                    style={styles.buttonNextEnable}
                                    //id='button-to-criarExercicios'
                                    //style=''
                                    accessibilityLabel="Novo Grupo Muscular"
                                    onPress={event => navigation.navigate("CreateExercises")}> Próximo</Text>
                                :
                                <Text style={styles.buttonNextDisabled}> Próximo</Text>
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
            <ErrorProgram text={erroProgram} />
        </View>
    )
}
const styles = StyleSheet.create({
    section: {
        display: "flex",
        flex: 1,
        backgroundColor: cor.gray900, //900,
        paddingTop: 60,
    },
    divWelcome: {
        display: "flex",
        flex: 1
        //animate-entraceWelcome
    },
    divTextWelcome: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
        paddingHorizontal: 25
    },
    divInputButton: {
        display: "flex",
        flex: 1,
        gap: 30,
        flexDirection: "column",
    },
    inicialText: {
        color: cor.gray200, //200,
        fontWeight: font.semibold, //semibold
        fontSize: 27
    },
    boldText: {
        color: cor.secundaria,
        fontWeight: font.extraBold
    },
    viewDivH2: {
        display: "flex",
        flexDirection: "column",
        gap: 20
    },
    viewH2: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    h2: {
        color: cor.gray200, //200,
        fontWeight: font.semibold,
        fontSize: 17 //2xl
    },
    icon: {
        color: cor.gray200, //200,
        //hover:animate-hoverWH'
    },
    viewTables: {
        display: "flex",
        flex: 2,
        rowGap: 24, //6
        marginTop: 12, //3
        padding: 24, //6
    },
    viewTextButtons: {
        display: "flex",
        flex: 1,
        marginBottom: 40,
        marginHorizontal: 30,
    },
    buttonNextDisabled: {
        alignSelf: "flex-end",
        color: cor.gray400,//400
        fontSize: 18, //lg
        fontWeight: font.medium,//medium
        borderColor: "gray", //600
        borderWidth: 2,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8 //lg
    },
    buttonNextEnable: {
        alignSelf: "flex-end",
        color: cor.gray200,
        fontSize: 18,
        fontWeight: font.medium,
        borderColor: cor.secundaria,
        borderWidth: 2,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8 //lg 
    }
})
export default Welcome