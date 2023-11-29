import { Tables } from '../../../models/Tables'
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
import { useParams } from 'react-router-native'
import ErrorProgram from '../../../components/ErrorProgram'
import Filter from '../../../components/Filter'
import WarningProgram from '../../../components/WarningProgram'
import { AsyncStorager } from '../../../service/LocalStorager'
const Table = () => {
    const { id } = useParams()
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
        if (typeFilter !== "Todos") {
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
    function changeNameTable(value: string) {
        if (warningProgram[0] === "") {
            const findValueIquals = tables.tables.find(thisTables => thisTables.name === value)
            const isThisElement = value === currentTable.name
            if (value === "") {
                setNameTable(currentTable.name)
                updadeMessageProgram(["O campo não pode ficar vazio!"], "error")
            } else {
                if (!findValueIquals) {
                    currentTable.name = value
                    tables.updateTables(currentTable)
                    setTables(tables.tables)
                    setSaveTable(tables.tables)
                    const indexPreference = preferences.preferences.findIndex(preference => preference.id === currentTable.id)
                    preferences.updatePreferenceWorkout(indexPreference, value)
                    updatePreferences(preferences.returnInformation())
                    AsyncStorager.saveTables(tables.tables)
                    AsyncStorager.savePreferences(preferences.returnInformation())
                } else if (!isThisElement) {
                    setNameTable(currentTable.name)
                    updadeMessageProgram(["Esse exercício já foi criado!"], "error")
                }
            }
        }
    }
    return (
        <section className="max-w-7xl w-full px-6 sm:px-20">
            <WarningDeleteTable currentTable={currentTable} setShowWarning={setShowWarning} showWarning={showWarning} />
            <WarningProgram text={warningProgram} saveTable={saveTable} setSaveTable={setSaveTable} />
            <div className='relative w-full flex justify-center'>
                <ErrorProgram text={errorProgram} />
                <Filter openFilter={openFilter} setOpenFilter={setOpenFilter} setTypeFilter={setTypeFilter} />
            </div>
            <div className='hidden justify-between items-center px-4 mb-8'>
                <div className='flex items-center gap-5'>
                    <input
                        maxLength={25}
                        value={nameTable}
                        onChange={event => setNameTable(event.target.value)}
                        onBlur={event => changeNameTable(event.target.value)}
                        className="bg-transparent border-dashed-hover py-1 text-gray-200 font-bold text-2xl" />
                    <button
                        onClick={event => createWorkout()}
                        className='h-fit text-gray-200 text-lg font-semibold px-4 py-[0.1rem] bg-cor-secundaria rounded-lg hover:animate-hoverBGSH'>Novo Treino</button>
                    <button
                        onClick={event => setShowWarning(true)}
                        className='h-fit text-gray-200 text-lg font-medium px-4 py-[0.1rem] bg-cor-delete rounded-lg hover:animate-hoverBGEH'>Deletar Grupo</button>
                </div>
                <input
                    type="text"
                    value={typeFilter}
                    onClick={event => setOpenFilter(true)}
                    readOnly
                    className='font-medium border border-cor-hover rounded-lg px-3 py-1' />
            </div>
            <div className="flex flex-col gap-10">
                {currentTable.information[0] ? tableFilter.map(workout =>
                    <Training key={workout.date} workout={workout} saveTable={saveTable} setSaveTable={setSaveTable} />
                ).reverse() : ""}
            </div>
        </section>
    )
}
export default Table