import { useSetRecoilState } from "recoil"
import { preferences } from "../atom"
import { IPreferences } from "../../shared/interfaces/IPreferences"

export const useUpdatePreferences = () =>{
    const setPreferences = useSetRecoilState<IPreferences>(preferences)
    return (event: IPreferences) => {
      return setPreferences(event)
    }
 }