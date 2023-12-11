import { useRecoilValue } from "recoil"
import { idSetsEdit } from "../atom"

const useIdSetsEdit = () => {
    return useRecoilValue(idSetsEdit)
}
export default useIdSetsEdit