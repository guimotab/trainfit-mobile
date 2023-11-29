import { useRecoilValue } from "recoil"
import { errorProgram } from "../atom"

const useErrorProgram = () => {
    return useRecoilValue(errorProgram)
}
export default useErrorProgram