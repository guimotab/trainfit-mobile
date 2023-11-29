import { useRecoilValue } from "recoil"
import { preferences } from "../atom"

const usePreferences = () => {
    return useRecoilValue(preferences)
}
export default usePreferences