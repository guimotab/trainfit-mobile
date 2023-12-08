import { atom } from "recoil";
import { IMuscleGroup } from "../shared/interfaces/IMuscleGroup";
import { AsyncStorager } from "../service/AsyncStorager";
import { IPreferences } from "../shared/interfaces/IPreferences";

export const tablesInformations = atom<IMuscleGroup[]>({
    key: 'tablesInformations',
    default: AsyncStorager.getInformations()
})
export const preferences = atom<IPreferences>({
    key: 'preferences',
    default: AsyncStorager.getPreferences()
})
export const sucessProgram = atom<string[]>({
    key: 'sucessProgram',
    default: [""]
})
export const errorProgram = atom<string[]>({
    key: 'errorProgram',
    default: [""]
})
export const warningProgram = atom<string[]>({
    key: 'warningProgram',
    default: [""]
})
export const changedWarning = atom<string[]>({
    key: 'changedWarning',
    default: [""]
})