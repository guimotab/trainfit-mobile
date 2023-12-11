import { IExercise } from "../shared/interfaces/IExercise";

export default function findCurrentSet(exercise: IExercise, numberSet: number) {
    const indexExercise = exercise.sets.findIndex(exercise => exercise.numberSet === numberSet)
    return exercise.sets[indexExercise]
}