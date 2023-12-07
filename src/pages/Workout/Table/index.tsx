import { Tables } from '../../../models/Tables'
import IconMenuKebab from '../../../../assets/svg/menuKebab.svg'
import useTables from '../../../state/hooks/useTables'
import findCurrentTable from '../../../utils/findCurrentTable'
import { MuscleGroup } from '../../../models/MuscleGroup'
import Training from '../Training'
import { createDate, newDayMonthYearToDate, newFindFilterDays, returnStartEndDate } from '../../../utils/createDate'
import { useUpdateTables } from '../../../state/hooks/useUpdateTables'
import { IMuscleGroupInformations } from '../../../shared/interfaces/IMuscleGroupInformations'
import { IExercise } from '../../../shared/interfaces/IExercise'
import usePreferences from '../../../state/hooks/usePreferences'
import useWarningProgram from '../../../state/hooks/useWarningProgram'
import { useEffect, useState } from 'react'
import useErrorProgram from '../../../state/hooks/useErrorProgram'
import WarningDeleteTable from './WarningDeleteTable'
import { useUpdateMessageProgram } from '../../../state/hooks/useUpdateMessageProgram'
import { useUpdatePreferences } from '../../../state/hooks/useUpdatePreferences'
import { AllPreferences } from '../../../models/AllPreferences'
import ErrorProgram from '../../../components/ErrorProgram'
import Filter from '../../../components/Filter'
import WarningProgram from '../../../components/WarningProgram'
import { AsyncStorager } from '../../../service/LocalStorager'
import { useRoute } from '@react-navigation/native'
import { ParamsProps } from '../../../@types/navigation'
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput } from "react-native"
import { cor, font } from '../../../utils/presetStyles'
const Table = () => {
    const route = useRoute()
    const params = route.params as ParamsProps
    const id = params.id.toString()
    const tables = new Tables(useTables())
    const setTables = useUpdateTables()
    const preferences = new AllPreferences(usePreferences())
    const updatePreferences = useUpdatePreferences()
    const updateTables = useUpdateTables()
    const [saveTable, setSaveTable] = useState(tables.tables)
    const currentTable = new MuscleGroup(findCurrentTable(saveTable, id!))
    const [typeFilter, setTypeFilter] = useState<string>("Últimos 7 dias")
    const [tableFilter, setTableFilter] = useState(filterDays(true)!)
    const [showWarning, setShowWarning] = useState(false)
    const [nameTable, setNameTable] = useState(currentTable.name)
    const [openFilter, setOpenFilter] = useState(false)
    const warningProgram = useWarningProgram()
    const [openMenuKebab, setOpenMenuKebab] = useState(false)
    const errorProgram = useErrorProgram()
    const updadeMessageProgram = useUpdateMessageProgram()

    useEffect(() => {
        setNameTable(currentTable.name)
    }, [currentTable.name])
    useEffect(() => {
        filterDays()
    }, [typeFilter, currentTable.information])
    function filterDays(giveReturn?: boolean) {
        let tablesFiltered = [] as IMuscleGroupInformations[]
        let startDay: Date
        let endDay: Date
        if (typeFilter !== "Todos os dias") {
            if (!typeFilter.split("-")[1]) {
                [startDay, endDay] = newFindFilterDays(typeFilter)
            } else {
                [startDay, endDay] = returnStartEndDate(typeFilter)
            }
            currentTable.information.forEach(workout => {
                const workoutDateFormated = newDayMonthYearToDate(workout.date)
                if (startDay <= workoutDateFormated && workoutDateFormated <= endDay) {
                    tablesFiltered.push(workout)
                }
            })
        } else {
            tablesFiltered = [...currentTable.information]
        }
        if (giveReturn) {
            return tablesFiltered
        } else {
            setTableFilter(tablesFiltered)
        }
    }
    function createWorkout() {
        function createExercise(basesExercises: string[]) {
            let exercise = [] as IExercise[]
            let idCounter = 1
            basesExercises.forEach(baseExercise => {
                exercise.push({
                    id: idCounter,
                    name: baseExercise,
                    sets: []
                } as IExercise)
                idCounter++
            })
            return exercise
        }
        if (warningProgram[0] === "") {
            const date = createDate()
            let newInformation: IMuscleGroupInformations
            if (!currentTable.information.find(information => information.date === date)) {
                if (preferences) {
                    const indexMuscleGroup = preferences.preferences.findIndex(preference => preference.nameMuscleGroup === currentTable.name)
                    let exercise: IExercise[]
                    if (preferences.preferences[0]) {
                        exercise = createExercise(preferences.preferences[indexMuscleGroup].basesExercises)
                    } else {
                        exercise = []
                    }
                    newInformation = {
                        date: date,
                        exercise: exercise,
                        feeling: ""
                    }
                    currentTable.createNewInformation(newInformation)
                } else {
                    currentTable.createNewInformation({ date: date, exercise: [], feeling: "" })
                }
                tables.updateTables(currentTable)
                setSaveTable(tables.tables)
                updateTables(tables.tables)
            }
        }
    }
    function changeNameTable() {
        const value = nameTable
        if (warningProgram[0] === "") {
            const findValueIquals = tables.tables.find(thisTables => thisTables.name === value)
            const isThisElement = value === currentTable.name
            if (value === "") {
                setNameTable(currentTable.name)
                updadeMessageProgram(["O campo não pode ficar vazio!"], "error")
            } else {
                if (!findValueIquals) {
                    currentTable.name = value
                    //tables
                    tables.updateTables(currentTable)
                    setTables(tables.tables)
                    AsyncStorager.saveTables(tables.tables)
                    setSaveTable(tables.tables)
                    //preferences
                    try {
                        const indexPreference = preferences.preferences.findIndex(preference => preference.id === currentTable.id)
                        preferences.updatePreferenceWorkout(indexPreference, value)
                        updatePreferences(preferences.returnInformation())
                        AsyncStorager.savePreferences(preferences.returnInformation())
                    } catch {
                    }
                } else if (!isThisElement) {
                    setNameTable(currentTable.name)
                    updadeMessageProgram(["Esse exercício já foi criado!"], "error")
                }
            }
        }
    }
    function deleteTableClicked() {
        setShowWarning(true)
        setOpenMenuKebab(false)
        updadeMessageProgram([""], "none")
        if (setSaveTable) {
            setSaveTable(tables.tables)
        }
    }
    return (
        <>
            <ScrollView>
                <View style={styles.section}>

                    <View style={styles.sectionView}>
                        <Filter openFilter={openFilter} setOpenFilter={setOpenFilter} setTypeFilter={setTypeFilter} />
                    </View>
                    <View style={styles.viewTextGroup}>
                        <View style={styles.textInputGroup}>
                            <TextInput
                                maxLength={25}
                                value={nameTable}
                                onChangeText={text => setNameTable(text)}
                                onEndEditing={event => changeNameTable()}
                                style={styles.textInput} />
                            <IconMenuKebab onPress={event => setOpenMenuKebab(true)} height={36} width={36} style={styles.icon} />
                            {openMenuKebab ?
                                <View style={styles.viewDeleteTable}>
                                    <Pressable style={styles.clickOutView} onPress={event => setOpenMenuKebab(false)}></Pressable>
                                    <View style={styles.viewTextDeleteTable}>
                                        <Text onPress={event => deleteTableClicked()} style={styles.deleteTable}>Deletar Tabela</Text>
                                    </View>
                                </View>
                                : <></>
                            }
                        </View>
                        <View style={styles.inputButtonGroup}>
                            <Pressable
                                onPress={event => setOpenFilter(true)}>
                                <Text style={styles.filter}>{typeFilter}</Text>
                            </Pressable>
                            <Text
                                onPress={event => createWorkout()}
                                style={styles.buttonNewExercise}>+ Treino</Text>
                        </View>
                    </View>
                    <View style={styles.viewTraining}>
                        {currentTable.information[0] ? currentTable.information.map(workout =>
                            <Training key={workout.date} workout={workout} saveTable={saveTable} setSaveTable={setSaveTable} />
                        ).reverse() : ""}
                    </View>
                </View>
            </ScrollView >
            <WarningDeleteTable currentTable={currentTable} setShowWarning={setShowWarning} showWarning={showWarning} />
            <WarningProgram text={warningProgram} saveTable={saveTable} setSaveTable={setSaveTable} />
            <ErrorProgram text={errorProgram} />
        </>
    )
}
const styles = StyleSheet.create({
    section: {
        paddingHorizontal: 24,
        paddingVertical: 30,
        minHeight: 1000,
        flex: 1,
    },
    sectionView: {
        position: "relative",
        display: "flex",
        justifyContent: "center"
    },
    viewTextGroup: {
        display: "flex",
        width: "100%",
        marginBottom: 32,
        gap: 30
    },
    textInputGroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    inputButtonGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textInput: {
        width: "80%",
        backgroundColor: "transparent",
        fontWeight: font.semibold,
        fontSize: 19,
        color: cor.gray200,
        borderBottomWidth: 2,
        borderColor: cor.secundaria,
        borderStyle: "dashed"
    },
    viewDeleteTable: {
        position: "absolute",
        flex: 1,
        zIndex: 20,
        right: -20,
        top: -40
    },
    clickOutView: {
        flex: 1,
        height: 10000,
        width: 10000,
        zIndex: 20,
        top: -7000,
    },
    viewTextDeleteTable: {
        position: "absolute",
        top: 70,
        right: 24,
        zIndex: 30,
        backgroundColor: cor.gray700,
        borderRadius: 7,
        paddingHorizontal: 20,
        paddingVertical: 8
    },
    deleteTable: {
        //'text-gray-200 font-medium'
        color: cor.gray200,
        fontWeight: font.medium
    },
    buttonNewExercise: {
        color: cor.gray200,
        fontSize: 16,
        fontWeight: font.semibold,
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: cor.secundaria,
        borderRadius: 8
    },
    buttonDeleteGroup: {
        color: cor.gray200,
        fontSize: 16,
        fontWeight: font.semibold,
        paddingHorizontal: 20,
        paddingVertical: 1,
        backgroundColor: cor.delete,
        borderRadius: 8
    },
    filter: {
        color: cor.gray200,
        fontSize: 15,
        fontWeight: font.medium,
        borderWidth: 1,
        borderColor: cor.hover,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 4
    },
    viewTraining: {
        //"flex flex-col gap-10"
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: 40
    },
    icon: {
        //'lg:hidden w-8 h-8 text-gray-200'
        width: 12,
        height: 12,
        fontSize: 12,
        color: cor.gray200
    }
});
export default Table