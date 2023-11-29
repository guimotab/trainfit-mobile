import { useRecoilValue } from "recoil"
import { tablesInformations } from "../atom"

const useTables = () => {
    return useRecoilValue(tablesInformations)
}
export default useTables