import { IMuscleGroup } from "../shared/interfaces/IMuscleGroup";

export default function findCurrentTable(tables:IMuscleGroup[], id: string){
    //const idNumber = Number(id)
    const indexCurrentTable = tables.findIndex(table=> table.id === Number(id))
    return tables[indexCurrentTable]
}