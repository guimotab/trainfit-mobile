import { IPreferencesWorkout } from "../shared/interfaces/IPreferencesWorkout";

export class PreferencesWorkout implements IPreferencesWorkout {
    private _id: number;
    private _basesExercises: string[];
    private _nameMuscleGroup: string;
    constructor({ id, basesExercises, nameMuscleGroup }: IPreferencesWorkout) {
        this._id = id;
        this._basesExercises = basesExercises;
        this._nameMuscleGroup = nameMuscleGroup;
    }
    
    updateBaseExercise(oldBaseExercise: string, newBaseExercise: string) {
        const fakeBasesExercises = [...this._basesExercises]
        const findIndexOldExercise = fakeBasesExercises.findIndex(baseExercise => baseExercise === oldBaseExercise)
        fakeBasesExercises.splice(findIndexOldExercise, 1, newBaseExercise)
        this._basesExercises = [...fakeBasesExercises]
    }
    deleteExercise(oldBaseExercise: string) {
        const fakeBasesExercises = [...this._basesExercises]
        const findIndexOldExercise = fakeBasesExercises.findIndex(baseExercise => baseExercise === oldBaseExercise)
        fakeBasesExercises.splice(findIndexOldExercise, 1)
        this._basesExercises = [...fakeBasesExercises]
    }
    returnPreferences() {
        return {
            id: this._id,
            basesExercises: this._basesExercises,
            nameMuscleGroup: this._nameMuscleGroup
        } as IPreferencesWorkout
    }
    public get id(): number {
        return this._id
    }

    public set id(newId: number) {
        this._id = newId;
    }
    public get basesExercises(): string[] {
        return this._basesExercises
    }

    public set basesExercises(newBasesExercises: string[]) {
        this._basesExercises = newBasesExercises;
    }
    public get nameMuscleGroup(): string {
        return this._nameMuscleGroup
    }

    public set nameMuscleGroup(newNameMuscleGroup: string) {
        this._nameMuscleGroup = newNameMuscleGroup;
    }
}