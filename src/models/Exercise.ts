import { IExercise } from "../shared/interfaces/IExercise";
import { ISets } from "../shared/interfaces/ISets";
import { Sets } from "./Sets";

export class Exercise implements IExercise {
    private _id: number
    private _name: string
    private _sets: ISets[]

    constructor({ id, name, sets }: IExercise) {
        this._id = id
        this._name = name
        this._sets = sets
    }
    updateSets(exercise: IExercise, numberSet: string, newSet: ISets) {
        const allSets = [...exercise.sets]
        const indexSet = exercise.sets.findIndex(set => set.numberSet === Number(numberSet))
        const sets = new Sets(exercise.sets[indexSet])
        sets.updateSet(newSet)
        allSets.splice(indexSet, 1, sets.returnSet())
        exercise.sets = [...allSets]
    }
    deleteSets(exercise: IExercise, numberSet: string) {
        const allSets = [...exercise.sets]
        const indexSet = exercise.sets.findIndex(set => set.numberSet === Number(numberSet))
        const numberSetDeleted = allSets[indexSet].numberSet
        allSets.splice(indexSet, 1)
        allSets.forEach(thisSet => {
            const indexSets = allSets.findIndex(sets => sets.numberSet === thisSet.numberSet)
            const set = new Sets(allSets[indexSets])
            if (set.numberSet > numberSetDeleted) {
                set.numberSet -= 1
                allSets[indexSets] = set.returnSet()
            }
        })
        exercise.sets = [...allSets]
    }
    returnExercise() {
        return {
            id: this._id,
            name: this._name,
            sets: this._sets
        } as IExercise
    }
    createSets(newSets: ISets) {
        const allSets = [...this._sets]
        allSets.push(newSets)
        this._sets = [...allSets]
    }
    highestNumberSet() {
        try {
            const lastNumberSet = this._sets.length - 1
            return this._sets[lastNumberSet].numberSet
        } catch {
            return 0
        }
    }
    public get id(): number {
        return this._id
    }
    public set id(id: number) {
        this._id = id;
    }
    public get name(): string {
        return this._name
    }
    public set name(name: string) {
        this._name = name;
    }
    public get sets(): ISets[] {
        return this._sets
    }
    public set sets(sets: ISets[]) {
        this._sets = sets;
    }
}