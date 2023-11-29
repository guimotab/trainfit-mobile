import { IMuscleGroupInformations } from "./IMuscleGroupInformations"

export interface IMuscleGroup {
    id: number
    name: string
    logo: string
    information: IMuscleGroupInformations[]
}