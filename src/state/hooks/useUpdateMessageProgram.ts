import { useSetRecoilState } from "recoil"
import { errorProgram, sucessProgram, warningProgram } from "../atom"

let timerWarning: NodeJS.Timeout
let timerError: NodeJS.Timeout
let timerSucess: NodeJS.Timeout
export const useUpdateMessageProgram = () => {
  const setWarning = useSetRecoilState<string[]>(warningProgram)
  const setSucess = useSetRecoilState<string[]>(sucessProgram)
  const setError = useSetRecoilState<string[]>(errorProgram)
  return (event: string[], typeMessage: "warning" | "error" | "sucess" | "none") => {
    setWarning([""])
    setSucess([""])
    setError([""])
    if (typeMessage === "warning") {
      // clearTimeout(timerWarning)
      // timerWarning = setTimeout(() => setWarning([""]), 3000)
      return setWarning(event)
    } else if (typeMessage === "error") {
      clearTimeout(timerError)
      timerError = setTimeout(() => setError([""]), 3000)
      return setError(event)
    } else if (typeMessage === "sucess") {
      clearTimeout(timerSucess)
      timerSucess = setTimeout(() => setSucess([""]), 3000)
      return setSucess(event)
    } else {
      return
    }
  }
}