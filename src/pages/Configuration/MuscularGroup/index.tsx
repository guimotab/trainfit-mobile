import { IoMdTrash } from "react-icons/io"
import { IPreferencesWorkout } from "../../../shared/interfaces/IPreferencesWorkout"
import Exercise from "../Exercise"
import { useState } from "react"
import { PreferencesWorkout } from "../../../models/PreferencesWorkout"
import { Tables } from "../../../models/Tables"
import useTables from "../../../state/hooks/useTables"
import { MuscleGroup } from "../../../models/MuscleGroup"
import { IMuscleGroup } from "../../../shared/interfaces/IMuscleGroup"
import { useUpdateMessageProgram } from "../../../state/hooks/useUpdateMessageProgram"
import { AiOutlinePlusCircle } from "react-icons/ai"
interface MuscularGroupProps {
    preference: IPreferencesWorkout
    savePreferences: IPreferencesWorkout[]
    saveTable: IMuscleGroup[]
    setSaveTable: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
    setSavePreferences: React.Dispatch<React.SetStateAction<IPreferencesWorkout[]>>
}
const MuscularGroup = ({ preference, savePreferences, saveTable, setSaveTable, setSavePreferences }: MuscularGroupProps) => {
    const [createNewExercise, setCreateNewExercise] = useState(false)
    const [valueInput, setValueInput] = useState(preference.nameMuscleGroup)
    const setMessageProgram = useUpdateMessageProgram()
    const tables = new Tables(useTables())
    const saveTables = new Tables(saveTable)

    function editNameMuscularGroup(value: string) {
        const findValueIquals = savePreferences.find(thisExercise => thisExercise.nameMuscleGroup === value)
        const isThisElement = value === preference.nameMuscleGroup
        if (value === "") {
            setValueInput(preference.nameMuscleGroup)
            setMessageProgram(["O campo não pode ficar vazio!"], "error")
        } else {
            if (!findValueIquals) {
                //save on the table
                const indexTable = saveTables.tables.findIndex(table => table.id === preference.id)
                const thisTable = new MuscleGroup(saveTables.tables[indexTable])
                thisTable.name = value
                saveTables.updateTables(thisTable)
                setSaveTable(saveTables.tables)
                //save on the preferences
                const fakePreferences = [...savePreferences]
                const preferenceWorkout = new PreferencesWorkout(preference)
                const indexPreferences = fakePreferences.findIndex(preference => preference.nameMuscleGroup === preferenceWorkout.nameMuscleGroup)
                preferenceWorkout.nameMuscleGroup = value
                fakePreferences.splice(indexPreferences, 1, preferenceWorkout.returnPreferences())
                setSavePreferences(fakePreferences)
                setValueInput(value)
            } else if (!isThisElement) {
                setValueInput(preference.nameMuscleGroup)
                setMessageProgram(["Esse grupo muscular já foi criado!"], "error")
            }
        }
    }
    function saveNewExercise(value: string) {
        const findThisPreference = savePreferences.findIndex(preference => preference.nameMuscleGroup === valueInput)
        const findValueIquals = savePreferences[findThisPreference].basesExercises.find(thisExercise => thisExercise === value)
        const isThisElement = value === preference.nameMuscleGroup
        if (value === "") {
            setMessageProgram(["O campo não pode ficar vazio!"], "error")
        } else if (!findValueIquals) {
            //save on the preferences
            const preferenceWorkout = new PreferencesWorkout(preference)
            const fakeBase = [...preference.basesExercises]
            fakeBase.push(value)
            preferenceWorkout.basesExercises = [...fakeBase]
            const fakePreferences = [...savePreferences]
            const findIndexPreference = fakePreferences.findIndex(thisPreference => thisPreference.nameMuscleGroup === preference.nameMuscleGroup)
            fakePreferences.splice(findIndexPreference, 1, preferenceWorkout.returnPreferences())
            setSavePreferences(fakePreferences)
        } else if (!isThisElement) {
            setMessageProgram(["Esse grupo muscular já foi criado!"], "error")
        }
        setCreateNewExercise(false)
    }
    function deleteMuscularGroup() {
        //save on the table
        const indexTable = saveTables.tables.findIndex(table => table.id === preference.id)
        if (!saveTables.tables[indexTable].information[0]) {
            saveTables.removeTable(preference.id)
            setSaveTable(saveTables.tables)
        }
        //save on the preferences
        const fakePreferences = [...savePreferences]
        const indexPreferences = fakePreferences.findIndex(thisPreference => thisPreference.nameMuscleGroup === preference.nameMuscleGroup)
        fakePreferences.splice(indexPreferences, 1)
        setSavePreferences(fakePreferences)
    }
    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col items-center lg:items-start h-full min-h-[5rem]">
                <div className="flex items-center py-3">
                    <IoMdTrash size={22} onClick={event => deleteMuscularGroup()} className="text-gray-200 hover:animate-hoverTrash" />
                    <input
                        maxLength={25}
                        value={valueInput}
                        onChange={event => setValueInput(event.target.value)}
                        onBlur={event => editNameMuscularGroup(event.target.value)}
                        className="bg-transparent sm:text-xl md:text-2xl font-semibold text-gray-200 mx-5 py-1 border-dashed-hover" />
                <AiOutlinePlusCircle size={30} onClick={event => setCreateNewExercise(true)} className='text-gray-200 font-bold hover:animate-hoverWH hover:cursor-pointer'/>
                 {/* <button
                        onClick={event => setCreateNewExercise(true)}
                        className="text-gray-200 font-semibold px-3 py-[0.1rem] bg-cor-secundaria rounded-lg hover:animate-hoverBGSH">Novo Exercício</button> */}
                </div>
                <div className="flex flex-col w-full xl:items-start px-10 gap-4">
                    {preference.basesExercises.map(exercise =>
                        <Exercise
                            key={exercise}
                            exercise={exercise}
                            preference={preference}
                            savePreferences={savePreferences}
                            setSavePreferences={setSavePreferences} />
                    )}
                    {createNewExercise ?
                        <input
                            type="text"
                            className="w-full max-w-[18rem] text-gray-800 font-medium sm:text-lg rounded-lg px-2 bg-gray-300 focus:bg-gray-100"
                            autoFocus
                            onBlur={event => saveNewExercise(event.target.value)} />
                        : <></>
                    }
                </div>
            </div>
        </div>
    )
}
export default MuscularGroup