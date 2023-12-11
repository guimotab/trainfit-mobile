import { useRecoilValue } from "recoil"
import { idExerciseEdit } from "../atom"

const useIdExerciseEdit = () => {
    return useRecoilValue(idExerciseEdit)
}
export default useIdExerciseEdit