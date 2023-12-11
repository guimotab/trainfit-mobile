import { useSetRecoilState } from "recoil"
import { idExerciseEdit } from "../atom"

export const useUpdateIdExerciseEdit = () =>{
    const setIdExercise = useSetRecoilState<string>(idExerciseEdit)
    return (event: string) => {
      return setIdExercise(event)
    }
 }