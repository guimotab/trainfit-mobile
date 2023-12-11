import { useSetRecoilState } from "recoil"
import { idSetsEdit } from "../atom"

export const useUpdateIdSetsEdit = () =>{
    const setIdSets = useSetRecoilState<string>(idSetsEdit)
    return (event: string) => {
      return setIdSets(event)
    }
 }