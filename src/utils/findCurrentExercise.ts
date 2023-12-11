import { IExercise } from "../shared/interfaces/IExercise";
import { IMuscleGroupInformations } from "../shared/interfaces/IMuscleGroupInformations";

export default function findCurrentExercise(workout: IMuscleGroupInformations, exerciseName: string) {
    const indexExercise = workout.exercise.findIndex(exercise => exercise.name === exerciseName)
    return workout.exercise[indexExercise]
}