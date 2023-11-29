import { Sets } from "./Sets"
import { Exercise as ExerciseClass } from "../../../../models/Exercise"
import { IMuscleGroupInformations } from "../../../../shared/interfaces/IMuscleGroupInformations"
import { ISets } from "../../../../shared/interfaces/ISets"
import { MuscleGroupInformation } from "../../../../models/MuscleGroupInformation"
import { MuscleGroup } from "../../../../models/MuscleGroup"
import useTables from "../../../../state/hooks/useTables"
import findCurrentTable from "../../../../utils/findCurrentTable"
import { Tables } from "../../../../models/Tables"
import { useUpdateTables } from "../../../../state/hooks/useUpdateTables"
import { AsyncStorager } from "../../../../service/LocalStorager"
import { IExercise } from "../../../../shared/interfaces/IExercise"
import { useEffect, useState } from "react"
import { IMuscleGroup } from "../../../../shared/interfaces/IMuscleGroup"
import { IoMdTrash } from "react-icons/io"
import { useUpdateMessageProgram } from "../../../../state/hooks/useUpdateMessageProgram"
import useWarningProgram from "../../../../state/hooks/useWarningProgram"
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useParams } from "react-router-native"
interface ExerciseProps {
    exercise: IExercise
    workout: IMuscleGroupInformations
    setSaveTable: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
    saveTable: IMuscleGroup[]
}
const Exercise = ({ exercise, workout, saveTable, setSaveTable }: ExerciseProps) => {
    const tables = new Tables(useTables())
    const saveTables = new Tables(saveTable)
    const setTables = useUpdateTables()
    const [nameExercise, setNameExercise] = useState(exercise.name)
    const { id } = useParams();
    const currentTable = new MuscleGroup(findCurrentTable(saveTables.tables, id!))
    const updadeMessageProgram = useUpdateMessageProgram()
    const warningProgram = useWarningProgram()
    useEffect(() => {
        setNameExercise(exercise.name)
    }, [exercise])

    function createNewSet() {
        if (warningProgram[0] === "") {
            const newExercise = new ExerciseClass(exercise)
            const newWorkout = new MuscleGroupInformation(workout)
            const newSet = {
                advancedTechnique: "Normal",
                numberSet: newExercise.highestNumberSet() + 1,
                observations: "",
                repetitions: 0,
                typeWeight: "Kg",
                weight: 0
            } as ISets
            newExercise.createSets(newSet)
            newWorkout.updateExercise(newExercise.name, newExercise.returnExercise())
            currentTable.updateInformations(workout.date, newWorkout.returnInformation())
            tables.updateTables(currentTable)
            setTables(tables.tables)
            setSaveTable(tables.tables)
            AsyncStorager.saveTables(tables.tables)
        }
    }
    function changeNameExercise(value: string) {
        if (warningProgram[0] === "") {
            const findValueIquals = workout.exercise.find(thisExercise => thisExercise.name === value)
            const isThisElement = value === exercise.name
            if (value === "") {
                setNameExercise(exercise.name)
                updadeMessageProgram(["O campo não pode ficar vazio!"], "error")
            } else {
                if (!findValueIquals) {
                    const workoutClass = new MuscleGroupInformation(workout)
                    const indexExercise = workoutClass.exercise.findIndex(thisExercise => thisExercise.id === exercise.id)
                    const exerciseClass = new ExerciseClass(workoutClass.exercise[indexExercise])
                    exerciseClass.name = value
                    workoutClass.updateExercise(exercise.name, exerciseClass.returnExercise())
                    currentTable.updateInformations(workoutClass.date, workoutClass.returnInformation())
                    tables.updateTables(currentTable)
                    setTables(tables.tables)
                    setSaveTable(tables.tables)
                    AsyncStorager.saveTables(tables.tables)
                } else if (!isThisElement) {
                    setNameExercise(exercise.name)
                    updadeMessageProgram(["Esse exercício já foi criado!"], "error")
                }
            }
        }
    }
    function deleteSet() {
        const workoutClass = new MuscleGroupInformation(workout)
        workoutClass.deleteExercise(exercise.id)
        currentTable.updateInformations(workoutClass.date, workoutClass.returnInformation())
        saveTables.updateTables(currentTable)
        setSaveTable(saveTables.tables)
        updadeMessageProgram(["Há alterações feitas!"], "warning")
    }

    return (
        <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-3'>
                <IoMdTrash onClick={event => deleteSet()} className="text-gray-200 w-5 h-5 hover:animate-hoverTrash" />
                <input
                    maxLength={20}
                    onChange={event => setNameExercise(event.target.value)}
                    value={nameExercise}
                    onBlur={event => changeNameExercise(event.target.value)}
                    className='bg-transparent w-full max-w-[15rem] text-gray-200 font-semibold  sm:text-xl focus:outline-none border-dashed-hover' />
                <AiOutlinePlusCircle onClick={event => createNewSet()} className='text-gray-200 w-7 h-7 font-bold hover:animate-hoverWH hover:cursor-pointer' />
            </div>
            {exercise.sets[0] ?
                exercise.sets.map(sets => <Sets key={sets.numberSet} sets={sets} exercise={exercise} workout={workout} saveTable={saveTable}
                    setSaveTable={setSaveTable} />)
                : <></>
            }
        </div>
    )
}

export default Exercise