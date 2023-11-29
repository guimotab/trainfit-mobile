import { useSetRecoilState } from "recoil"
import { IMuscleGroup } from "../../shared/interfaces/IMuscleGroup"
import { tablesInformations } from "../atom"

export const useUpdateTables = () =>{
    const setTableList = useSetRecoilState<IMuscleGroup[]>(tablesInformations)
    return (event: IMuscleGroup[]) => {
      return setTableList(event)
    }
 }