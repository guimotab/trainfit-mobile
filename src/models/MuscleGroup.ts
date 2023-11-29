import { IMuscleGroup } from "../shared/interfaces/IMuscleGroup"
import { IMuscleGroupInformations } from "../shared/interfaces/IMuscleGroupInformations"
import { ISets } from "../shared/interfaces/ISets"
import { MuscleGroupInformation } from "./MuscleGroupInformation"
export class MuscleGroup implements IMuscleGroup {
    private _id: number
    private _name: string
    private _logo: string
    private _information: IMuscleGroupInformations[]
    constructor({ id, name,logo, information }: IMuscleGroup) {
        this._id = id
        this._name = name
        this._logo = logo
        this._information = information
    }

    updateSets(dateId: string, newSet: ISets) {
        const allInformation = [...this._information]
        const [date, id, numberSet] = dateId.split("%")
        const indexInformation = allInformation.findIndex(information => information.date === date)
        const information = new MuscleGroupInformation(this._information[indexInformation])
        information.updateSets(information, id, numberSet, newSet)
        allInformation.splice(indexInformation, 1, information.returnInformation())
        this._information = [...allInformation]
    }
    deleteSets(dateId: string){
        const allInformation = [...this._information]
        const [date, id, numberSet] = dateId.split("%")
        const indexInformation = allInformation.findIndex(information => information.date === date)
        const information = new MuscleGroupInformation(this._information[indexInformation])
        information.deleteSets(information, id, numberSet)
        allInformation.splice(indexInformation, 1, information.returnInformation())
        this._information = [...allInformation]
    }
    updateInformations(date: string, newInformation: IMuscleGroupInformations) {
        const allInformation = [...this._information]
        const indexInformation = allInformation.findIndex(information => information.date === date)
        const information = new MuscleGroupInformation(this._information[indexInformation])
        information.updateInformation(newInformation)
        allInformation.splice(indexInformation, 1, information.returnInformation())
        this._information = [...allInformation]
    }
    deleteInformations(date: string){
        const allInformation = [...this._information]
        const indexInformation = allInformation.findIndex(information => information.date === date)
        allInformation.splice(indexInformation, 1)
        this._information = [...allInformation]
    }
    createNewInformation(newInformation: IMuscleGroupInformations) {
        const allInformation = [...this._information]
        allInformation.push(newInformation)
        this._information = [...allInformation]
    }

    returnTable() {
        return {
            id: this._id,
            name: this._name,
            logo: this._logo,
            information: this._information
        } as MuscleGroup
    }

    get id() {
        return this._id
    }
    get name() {
        return this._name
    }
    get logo() {
        return this._logo
    }
    set logo(newLogo) {
        this._logo = newLogo
    }
    set name(newName) {
        this._name = newName
    }
    get information() {
        return this._information
    }
}