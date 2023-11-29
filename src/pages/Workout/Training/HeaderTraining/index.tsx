import { FaRegLaughBeam } from 'react-icons/fa'
import { FaRegGrin } from 'react-icons/fa'
import { FaRegMeh } from 'react-icons/fa'
import { FaRegFrownOpen } from 'react-icons/fa'
import { FaRegFrown } from 'react-icons/fa'
import { MuscleGroup } from '../../../../models/MuscleGroup'
import { Tables } from '../../../../models/Tables'
import useTables from '../../../../state/hooks/useTables'
import findCurrentTable from '../../../../utils/findCurrentTable'
import { IMuscleGroupInformations } from '../../../../shared/interfaces/IMuscleGroupInformations'
import { useState } from 'react'
import { useUpdateTables } from '../../../../state/hooks/useUpdateTables'
import { AsyncStorager } from '../../../../service/LocalStorager'
import { MuscleGroupInformation } from '../../../../models/MuscleGroupInformation'
import { IMuscleGroup } from '../../../../shared/interfaces/IMuscleGroup'
import useWarningProgram from '../../../../state/hooks/useWarningProgram'
import { useUpdateMessageProgram } from '../../../../state/hooks/useUpdateMessageProgram'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useParams } from 'react-router-native'
interface HeaderTraininProps {
    workout: IMuscleGroupInformations
    setSaveTable: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
    saveTable: IMuscleGroup[]
}

const HeaderTraining = ({ workout, saveTable, setSaveTable }: HeaderTraininProps) => {
    const tables = new Tables(useTables())
    const saveTables = new Tables(saveTable)
    const setTables = useUpdateTables()
    const { id } = useParams()
    const currentTable = new MuscleGroup(findCurrentTable(tables.tables, id!))
    const [date, setDate] = useState(workout.date)
    const [exercise, setExercise] = useState(workout.exercise)
    const [feeling, setFeeling] = useState(workout.feeling)
    const [mobile, setMobile] = useState(false)
    const warningProgram = useWarningProgram()
    const updadeMessageProgram = useUpdateMessageProgram()

    window.addEventListener("resize", event=>{
        if(window.innerWidth < 1000){
            setMobile(true)
        } else {
            setMobile(false)
        }
    })

    function changeFeeling(feelingType: string) {
        if (warningProgram[0] === "") {
            const feeling = feelingType
            setFeeling(feelingType)
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
    function deleteWorkout() {
        currentTable.deleteInformations(workout.date)
        saveTables.updateTables(currentTable)
        setSaveTable(saveTables.tables)
        updadeMessageProgram(["Há alterações feitas!"], "warning")
    }
    const feelings = [
        {
            JSX: FaRegLaughBeam,
            id: "muitoBem",
            onClick: () => changeFeeling("muitoBem"),
            className: feeling === "muitoBem" ? 'hover:cursor-pointer text-green-500' : 'hover:cursor-pointer hover:text-gray-300'
        }, {
            JSX: FaRegGrin,
            id: "bem",
            onClick: () => changeFeeling("bem"),
            className: feeling === "bem" ? 'hover:cursor-pointer text-yellow-500' : 'hover:cursor-pointer hover:text-gray-300'
        }, {
            JSX: FaRegMeh,
            id: "normal",
            onClick: () => changeFeeling("normal"),
            className: feeling === "normal" ? 'hover:cursor-pointer text-blue-400' : 'hover:cursor-pointer hover:text-gray-300'
        }, {
            JSX: FaRegFrownOpen,
            id: "mal",
            onClick: () => changeFeeling("mal"),
            className: feeling === "mal" ? 'hover:cursor-pointer text-orange-500' : 'hover:cursor-pointer hover:text-gray-300'
        }, {
            JSX: FaRegFrown,
            id: "muitoMal",
            onClick: () => changeFeeling("muitoMal"),
            className: feeling === "muitoMal" ? 'hover:cursor-pointer text-red-700' : 'hover:cursor-pointer hover:text-gray-300'
        },

    ]

    return (
        <div className='flex flex-col md:flex-row md:justify-between'>
            <div className='flex items-start gap-3 mt-1'>
                <h3 className="text-gray-200 font-semibold text-lg sm:text-2xl">{workout.date}</h3>
                {mobile ?
                    <AiOutlinePlusCircle
                        onClick={event => createNewExercise()}
                        className='text-gray-200 w-7 h-7 font-bold hover:animate-hoverWH hover:cursor-pointer' />
                    :
                    <>
                        <button
                            onClick={event => createNewExercise()}
                            className='text-gray-200 text-lg font-medium px-3.5 bg-cor-secundaria rounded-lg hover:animate-hoverBGSH'>Novo Exercício</button>
                        <button
                            onClick={event => deleteWorkout()}
                            className='text-gray-200 text-lg font-medium px-3.5 bg-cor-delete rounded-lg hover:animate-hoverBGEH'>Deletar Treino</button>
                    </>
                }
            </div>
            <div className='flex flex-col md:items-center gap-2'>
                <p className='text-gray-200 sm:font-medium sm:text-lg'>Como você está hoje?</p>
                <div className='flex items-center gap-3 text-gray-400'>
                    {feelings.map(feeling =>
                        <feeling.JSX
                            key={feeling.id}
                            data-change
                            id={feeling.id}
                            size={20}
                            onClick={event => feeling.onClick()}
                            className={feeling.className} />
                    )}
                </div>
            </div>
        </div>
    )
}
export default HeaderTraining