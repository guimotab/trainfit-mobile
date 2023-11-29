import { ISets } from "../shared/interfaces/ISets";

export class Sets implements ISets{
    private _advancedTechnique: string;
    private _numberSet: number;
    private _observations: string;
    private _repetitions: number;
    private _typeWeight: string;
    private _weight: number;
    
    constructor({ advancedTechnique, numberSet, observations, repetitions, typeWeight, weight }: ISets) {
        this._advancedTechnique = advancedTechnique
        this._numberSet = numberSet
        this._observations = observations
        this._repetitions = repetitions
        this._typeWeight = typeWeight
        this._weight = weight
    }
    updateSet(newSet: ISets) {
        this._advancedTechnique = newSet.advancedTechnique
        this._numberSet = newSet.numberSet
        this._observations = newSet.observations
        this._repetitions = newSet.repetitions
        this._typeWeight = newSet.typeWeight
        this._weight = newSet.weight
    }
    returnSet() {
        const newSet = {
            advancedTechnique: this._advancedTechnique,
            numberSet: this._numberSet,
            observations: this._observations,
            repetitions: this._repetitions,
            typeWeight: this._typeWeight,
            weight: this._weight
        } as ISets
        return newSet
    }
    
    public get advancedTechnique() : string {
        return this._advancedTechnique
    }
    
    public set advancedTechnique(advancedTechnique : string) {
        this._advancedTechnique = advancedTechnique;
    }
    public get numberSet() : number {
        return this._numberSet
    }
    
    public set numberSet(numberSet : number) {
        this._numberSet = numberSet;
    }
    public get observations() : string {
        return this._observations
    }
    
    public set observations(observations : string) {
        this._observations = observations;
    }
    public get repetitions() : number {
        return this._repetitions
    }
    
    public set repetitions(repetitions : number) {
        this._repetitions = repetitions;
    }
    public get typeWeight() : string {
        return this._typeWeight
    }
    
    public set typeWeight(typeWeight : string) {
        this._typeWeight = typeWeight;
    }
    public get weight() : number {
        return this._weight
    }
    
    public set weight(weight : number) {
        this._weight = weight;
    }
    
    
}