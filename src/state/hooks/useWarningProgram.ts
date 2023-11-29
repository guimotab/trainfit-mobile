import { useRecoilValue } from "recoil"
import { warningProgram } from "../atom"

const useWarningProgram = () => {
    return useRecoilValue(warningProgram)
}
export default useWarningProgram