import { IExercise } from "../shared/interfaces/IExercise";
import { IMuscleGroupInformations } from "../shared/interfaces/IMuscleGroupInformations";

export default function findCurrentExercise(workout: IMuscleGroupInformations, exerciseName: string) {
    const indexExercise = workout.exercise.findIndex(exercise => exercise.name === exerciseName)
    if (indexExercise === -1) {
        let newId
        try{
            newId = workout.exercise[workout.exercise.length - 1].id + 1
        } catch {
            newId = 1
        }
        return { id: newId, name: "", sets: [] } as IExercise
    } else {
        return workout.exercise[indexExercise]
    }
}