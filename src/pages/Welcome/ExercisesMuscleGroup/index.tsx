import { AiOutlinePlusCircle } from "react-icons/ai"
import { IPreferencesWorkout } from "../../../shared/interfaces/IPreferencesWorkout"
import Exercises from "./Exercises"
import { PreferencesWorkout } from "../../../models/PreferencesWorkout"
import { AllPreferences } from "../../../models/AllPreferences"
import usePreferences from "../../../state/hooks/usePreferences"
import { useUpdatePreferences } from "../../../state/hooks/useUpdatePreferences"
import { useState } from "react"
import { useUpdateMessageProgram } from "../../../state/hooks/useUpdateMessageProgram"

interface ExercisesMuscleGroupProps {
    preference: IPreferencesWorkout
}

const ExercisesMuscleGroup = ({ preference }: ExercisesMuscleGroupProps) => {
    const preferences = new AllPreferences(usePreferences())
    const setPreferences = useUpdatePreferences()
    const setMessageProgram = useUpdateMessageProgram()
    const [newExercise, setNewExercise] = useState(false)

    function saveNewExercise(value: string) {
        const findValueIquals = preference.basesExercises.find(thisExercise => thisExercise === value)
        const isThisElement = value === preference.nameMuscleGroup
        if (value === "") {
            setMessageProgram(["O campo não pode ficar vazio!"], "error")
        } else if (!findValueIquals) {
            //save on the preferences
            const preferenceWorkout = new PreferencesWorkout(preference)
            const fakeBase = [...preference.basesExercises]
            fakeBase.push(value)
            preferenceWorkout.basesExercises = [...fakeBase]
            const fakePreferences = [...preferences.preferences]
            const findIndexPreference = fakePreferences.findIndex(thisPreference => thisPreference.nameMuscleGroup === preference.nameMuscleGroup)
            fakePreferences.splice(findIndexPreference, 1, preferenceWorkout.returnPreferences())
            setPreferences({ initializer: preferences.initializer, preferencesWorkout: fakePreferences })
        } else if (!isThisElement) {
            setMessageProgram(["Esse exercício já foi criado!"], "error")
        }
        setNewExercise(false)
    }

    return (
        <div className="flex justify-center px-6 w-full">
            <div className="flex flex-col w-full border-2 border-cor-secundaria hover:animate-hoverBorderSH rounded-xl px-6 py-2 gap-3">
                <div className="flex items-center gap-3">
                    <p className="py-1 bg-transparent text-gray-200 font-medium text-2xl" >
                        {preference.nameMuscleGroup}
                    </p>
                    <AiOutlinePlusCircle size={28} onClick={event => setNewExercise(true)} className='text-gray-200 cursor-pointer hover:animate-hoverWH' />
                </div>
                <div className="flex flex-col gap-2 pb-4">
                    {preference.basesExercises.map(exercise =>
                        <Exercises key={exercise} preference={preference} exercise={exercise} />
                    )}
                    {newExercise ?
                        <input
                            type="text"
                            className="w-full max-w-[18rem] text-gray-800 font-medium text-lg rounded-lg px-2 bg-gray-300 focus:bg-gray-100"
                            autoFocus
                            onBlur={event => saveNewExercise(event.target.value)} />
                        : <></>
                    }
                </div>
            </div>
        </div>
    )
}
export default ExercisesMuscleGroup