import { useRecoilValue } from "recoil"
import { sucessProgram } from "../atom"

const useSucessProgram = () => {
    return useRecoilValue(sucessProgram)
}
export default useSucessProgram