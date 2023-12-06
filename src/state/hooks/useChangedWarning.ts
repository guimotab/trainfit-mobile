import { useRecoilValue } from "recoil"
import { changedWarning } from "../atom"

const useChangedWarning = () => {
    return useRecoilValue(changedWarning)
}
export default useChangedWarning