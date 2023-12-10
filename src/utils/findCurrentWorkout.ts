import { IMuscleGroup } from "../shared/interfaces/IMuscleGroup"

export default function findCurrentWorkout(currentTable: IMuscleGroup, date: string) {
    const indexExercise = currentTable.information.findIndex(exercise => exercise.date === date)
    if (indexExercise !== -1) {
        return currentTable.information[indexExercise]
    }
}