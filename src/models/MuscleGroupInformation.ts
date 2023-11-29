import { IExercise } from "../shared/interfaces/IExercise";
import { IMuscleGroupInformations } from "../shared/interfaces/IMuscleGroupInformations";
import { ISets } from "../shared/interfaces/ISets";
import { Exercise } from "./Exercise";

export class MuscleGroupInformation implements IMuscleGroupInformations {
    private _date: string;
    private _feeling: string
    private _exercise: IExercise[];
    constructor({ date, exercise, feeling }: IMuscleGroupInformations) {
        this._date = date;
        this._feeling = feeling
        this._exercise = exercise;
    }
    deleteExercise(idExercise: number){
        const exercises = [...this._exercise]
        const indexExercise = exercises.findIndex(exercise => exercise.id === idExercise)
        exercises.splice(indexExercise, 1)
        this._exercise = [...exercises]
    }
    updateExercise(nameExercise: string, newExercise: IExercise) {
        const exercises = [...this._exercise]
        const indexExercise = exercises.findIndex(exercise => exercise.name === nameExercise)
        exercises[indexExercise] = newExercise
        this._exercise = [...exercises]
    }
    addNewExercise(newExercise: IExercise) {
        const exercises = [...this._exercise]
        exercises.push(newExercise)
        this._exercise = [...exercises]
    }
    updateSets(information: IMuscleGroupInformations, id: string, numberSet: string, newSet: ISets) {
        const thisExercise = [...this._exercise]
        const indexExercise = information.exercise.findIndex(exercise => exercise.id === Number(id))
        const exercise = new Exercise(information.exercise[indexExercise])
        exercise.updateSets(exercise, numberSet, newSet)
        thisExercise.splice(indexExercise, 1, exercise.returnExercise())
        this._exercise = [...thisExercise]
    }
    deleteSets(information: IMuscleGroupInformations, id: string, numberSet: string){
        const thisExercise = [...this._exercise]
        const indexExercise = information.exercise.findIndex(exercise => exercise.id === Number(id))
        const exercise = new Exercise(information.exercise[indexExercise])
        exercise.deleteSets(exercise, numberSet)
        thisExercise.splice(indexExercise, 1, exercise.returnExercise())
        this._exercise = [...thisExercise]
    }
    updateInformation(newInformation: IMuscleGroupInformations) {
        this._date = newInformation.date;
        this._feeling = newInformation.feeling
        this._exercise = newInformation.exercise;
    }
    returnInformation() {
        return {
            date: this._date,
            feeling: this._feeling,
            exercise: this._exercise
        } as IMuscleGroupInformations
    }


    public get date(): string {
        return this._date
    }
    public set date(date: string) {
        this._date = date;
    }
    public get feeling(): string {
        return this._feeling
    }
    public set feeling(feeling: string) {
        this._feeling = feeling;
    }
    public get exercise(): IExercise[] {
        return this._exercise
    }
    public set exercise(exercise: IExercise[]) {
        this._exercise = exercise;
    }
}