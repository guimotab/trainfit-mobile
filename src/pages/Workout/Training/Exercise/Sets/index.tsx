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
import { IoMdTrash } from "react-icons/io";
import { IMuscleGroup } from "../../../../../shared/interfaces/IMuscleGroup";
import useWarningProgram from "../../../../../state/hooks/useWarningProgram";
import { useUpdateMessageProgram } from "../../../../../state/hooks/useUpdateMessageProgram";
import { useParams } from "react-router-native";
export interface SetsProps {
    sets: ISets
    exercise: IExercise
    workout: IMuscleGroupInformations
    setSaveTable: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
    saveTable: IMuscleGroup[]
}
export const Sets = ({ sets, exercise, workout, saveTable, setSaveTable }: SetsProps) => {
    const tables = new Tables(useTables());
    const saveTables = new Tables(saveTable)
    const setTables = useUpdateTables()
    const updadeMessageProgram = useUpdateMessageProgram()
    const warningProgram = useWarningProgram()
    const { id } = useParams();
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
        <div className='flex flex-col gap-1.5 border-2 border-gray-200 rounded-xl px-5 py-3'>
            <div className="flex w-full justify-between">
                <h4 className='text-lg font-medium text-gray-200'>{numberSet}° Série</h4>
                <IoMdTrash size={24} onClick={event => deleteSet()} className="text-gray-200 hover:animate-hoverTrash" />
            </div>
            <div className='flex flex-col gap-1.5 pl-3'>
                <div className='flex items-center gap-3'>
                    <p className='text-gray-200'>Peso: </p>
                    <input
                        type="number"
                        value={weight}
                        min={0}
                        className='w-20 font-medium pl-1 rounded-lg'
                        onChange={event => setWeight(Number(event.target.value))}
                        onBlur={event => saveInformations()} />
                    <select
                        value={typeWeight}
                        className=' font-medium rounded-lg'
                        onChange={event => setTypeWeight(event.target.value)}>
                        {typeWeightArray.map((typeWeight, index) => <option key={index} className='font-medium'>{typeWeight}</option>)}
                    </select>
                </div>
                <div className='flex items-center gap-3'>
                    <p className='text-gray-200'>Repetições: </p>
                    <input
                        type="number"
                        value={repetitions}
                        min={0}
                        max={99}
                        className='w-14 font-medium pl-1 rounded-lg'
                        onChange={event => setRepetitions(Number(event.target.value))}
                        onBlur={event => saveInformations()} />
                </div>
                <div className='flex items-center gap-3'>
                    <p className='text-gray-200'>Técnica Avancada: </p>
                    <select
                        value={advancedTechnique}
                        className='font-medium rounded-lg focus:outline-none'
                        onChange={event => setAdvancedTechnique(event.target.value)}>
                        {advancedTechniqueArray.map((technique, index) => <option key={index} className='font-medium'>{technique}</option>)}
                    </select>
                </div>
                <div className='flex gap-3'>
                    <p className='text-gray-200'>Observações: </p>
                    <textarea
                        rows={3}
                        maxLength={110}
                        className='w-full max-w-sm font-medium px-2 rounded-lg focus:outline-none'
                        value={observations}
                        onChange={event => setObservations(event.target.value)}
                        onBlur={event => saveInformations()} />
                </div>
            </div>
        </div>
    );
};