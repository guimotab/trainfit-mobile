import Exercise from "./Exercise"
import HeaderTraining from "./HeaderTraining"
import { IMuscleGroupInformations } from "../../../shared/interfaces/IMuscleGroupInformations"
import { IMuscleGroup } from "../../../shared/interfaces/IMuscleGroup"
interface TrainingProps {
    workout: IMuscleGroupInformations
    saveTable: IMuscleGroup[]
    setSaveTable: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
}

const Training = ({ workout, saveTable, setSaveTable }: TrainingProps) => {
    return (
        <div key={workout.date} className="flex flex-col bg-gray-700 rounded-2xl px-7 py-4 gap-3">
            <HeaderTraining workout={workout} saveTable={saveTable} setSaveTable={setSaveTable} />
            <div className='flex flex-col gap-5'>
                {workout.exercise.map((exercise, index) =>
                    <Exercise key={index} exercise={exercise} workout={workout} saveTable={saveTable} setSaveTable={setSaveTable} />
                )}
            </div>
        </div>
    )
}

export default Training