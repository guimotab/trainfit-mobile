import { IMuscleGroup } from "../shared/interfaces/IMuscleGroup";
import { IMuscleGroupInformations } from "../shared/interfaces/IMuscleGroupInformations";
import { createDate } from "../utils/createDate";
import { MuscleGroup } from "./MuscleGroup";

export class Tables {
    private _tables: IMuscleGroup[]
    constructor(tables: IMuscleGroup[]) {
        this._tables = tables
    }
    updateTables(currentTable: MuscleGroup) {
        const indexTable = this._tables.findIndex(table => table.id === currentTable.id)
        const allTables = [...this._tables]
        allTables.splice(indexTable, 1, currentTable.returnTable())
        this._tables = [...allTables]
    }
    addNewTable(idTable: number, nameTable: string, information?: IMuscleGroupInformations[]) {
        const fakeTables = [...this._tables]
        const newTable = {
            id: idTable,
            information: information || [{ date: createDate(), exercise: [], feeling: "" }],
            logo: "iconHalter",
            name: nameTable
        } as IMuscleGroup
        fakeTables.push(newTable)
        this._tables = [...fakeTables]
    }
    removeTable(idTable: number) {
        const fakeTables = [...this._tables]
        const indexTable = this.tables.findIndex(table => table.id === idTable)
        fakeTables.splice(indexTable, 1)
        this._tables = fakeTables
    }

    get tables() {
        return this._tables
    }
}