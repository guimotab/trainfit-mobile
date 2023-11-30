import { useState } from "react"
import { IPreferencesWorkout } from "../../../shared/interfaces/IPreferencesWorkout"
import { PreferencesWorkout } from "../../../models/PreferencesWorkout"
import { useUpdateMessageProgram } from "../../../state/hooks/useUpdateMessageProgram"

interface ExerciseProps {
    exercise: string
    preference: IPreferencesWorkout
    savePreferences: IPreferencesWorkout[]
    setSavePreferences: React.Dispatch<React.SetStateAction<IPreferencesWorkout[]>>

}
const Exercise = ({ exercise, savePreferences, preference, setSavePreferences }: ExerciseProps) => {
    const [baseExercise, setBaseExercise] = useState(exercise)
    const setMessageProgram = useUpdateMessageProgram()
    function editExercise(value: string) {
        const findValueIquals = preference.basesExercises.find(thisExercise => thisExercise === value)
        const isThisElement = value === exercise
        if (value === "") {
            setBaseExercise(exercise)
            setMessageProgram(["O campo não pode ficar vazio!"], "error")
        } else {
            if (!findValueIquals) {
                const fakePreferences = [...savePreferences]
                const preferenceWorkout = new PreferencesWorkout(preference)
                const indexPreferences = fakePreferences.findIndex(preference => preference.nameMuscleGroup === preferenceWorkout.nameMuscleGroup)
                preferenceWorkout.updateBaseExercise(exercise, value)
                fakePreferences.splice(indexPreferences, 1, preferenceWorkout.returnPreferences())
                setSavePreferences(fakePreferences)
                setBaseExercise(value)
            } else if (!isThisElement) {
                setBaseExercise(exercise)
                setMessageProgram(["Esse exercício já foi criado!"], "error")
            }
        }
    }
    function deleteExercise() {
        const fakePreferences = [...savePreferences]
        const preferenceWorkout = new PreferencesWorkout(preference)
        const indexPreferences = fakePreferences.findIndex(preference => preference.nameMuscleGroup === preferenceWorkout.nameMuscleGroup)
        preferenceWorkout.deleteExercise(exercise)
        fakePreferences.splice(indexPreferences, 1, preferenceWorkout.returnPreferences())
        setSavePreferences(fakePreferences)
    }
    return (
        <div className="flex items-center gap-3">
            <input
                id={baseExercise}
                value={baseExercise}
                onChange={event => setBaseExercise(event.target.value)}
                onBlur={event => editExercise(event.target.value)}
                maxLength={20}
                className="w-full max-w-[18rem] text-gray-800 font-medium sm:text-lg rounded-lg px-2 bg-gray-300 focus:bg-gray-100" />
            {/* <IoMdTrash size={22} onClick={event => deleteExercise()} className="text-gray-200 hover:animate-hoverTrash" /> */}
        </div>
    )
}

export default Exercise