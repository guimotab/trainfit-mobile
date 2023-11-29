import { IoMdTrash } from "react-icons/io"
import { useEffect, useState } from "react"
import { AllPreferences } from "../../../models/AllPreferences"
import { PreferencesWorkout } from "../../../models/PreferencesWorkout"
import usePreferences from "../../../state/hooks/usePreferences"
import { useUpdateMessageProgram } from "../../../state/hooks/useUpdateMessageProgram"
import { useUpdatePreferences } from "../../../state/hooks/useUpdatePreferences"
import { IPreferencesWorkout } from "../../../shared/interfaces/IPreferencesWorkout"

interface ExerciseseGroupProps {
    preference: IPreferencesWorkout
    exercise: string
}

const Exercises = ({ preference, exercise }: ExerciseseGroupProps) => {
    const preferences = new AllPreferences(usePreferences())
    const setPreferences = useUpdatePreferences()
    const setMessageProgram = useUpdateMessageProgram()
    const [baseExercise, setBaseExercise] = useState(preference.basesExercises)
    const [exerciseName, setExerciseName] = useState(exercise)
    useEffect(() => {
        setExerciseName(exercise)
        setBaseExercise(preference.basesExercises)
    }, [exercise])

    function editExercise(value: string) {
        const findValueIquals = baseExercise.find(thisExercise => thisExercise === value)
        const isThisElement = value === exercise
        if (value === "") {
            setExerciseName(exercise)
            setMessageProgram(["O campo não pode ficar vazio!"], "error")
        } else {
            if (!findValueIquals) {
                const fakePreferences = [...preferences.preferences]
                const preferenceWorkout = new PreferencesWorkout(preference)
                const indexPreferences = fakePreferences.findIndex(preference => preference.nameMuscleGroup === preferenceWorkout.nameMuscleGroup)
                preferenceWorkout.updateBaseExercise(exercise, value)
                fakePreferences.splice(indexPreferences, 1, preferenceWorkout.returnPreferences())
                setPreferences({ initializer: preferences.initializer, preferencesWorkout: fakePreferences })
                setExerciseName(value)
            } else if (!isThisElement) {
                setExerciseName(exercise)
                setMessageProgram(["Esse exercício já foi criado!"], "error")
            }
        }
    }
    function deleteMuscleGroup() {
        const fakePreferences = [...preferences.preferences]
        const preferenceWorkout = new PreferencesWorkout(preference)
        const indexPreferences = fakePreferences.findIndex(preference => preference.nameMuscleGroup === preferenceWorkout.nameMuscleGroup)
        preferenceWorkout.deleteExercise(exercise)
        fakePreferences.splice(indexPreferences, 1, preferenceWorkout.returnPreferences())
        setPreferences({ initializer: preferences.initializer, preferencesWorkout: fakePreferences })
    }
    return (
        <div key={exercise} className="flex items-center gap-3">
            <input
                maxLength={30}
                value={exerciseName}
                onChange={event => setExerciseName(event.target.value)}
                onBlur={event => editExercise(event.target.value)}
                className=" ml-3 pr-4 py-1 bg-transparent border-dashed-hover text-gray-200 text-lg" />
            <IoMdTrash size={22} onClick={event => deleteMuscleGroup()} className="text-gray-200 hover:animate-hoverTrash" />
        </div>
    )
}
export default Exercises