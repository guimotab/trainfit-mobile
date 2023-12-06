import { useSetRecoilState } from "recoil"
import { changedWarning, errorProgram, sucessProgram, warningProgram } from "../atom"
import useChangedWarning from "./useChangedWarning"

let timerChanged: NodeJS.Timeout
let timerError: NodeJS.Timeout
let timerSucess: NodeJS.Timeout
export const useUpdateMessageProgram = () => {
  const setWarning = useSetRecoilState<string[]>(warningProgram)
  const setChanged = useSetRecoilState<string[]>(changedWarning)
  const setSucess = useSetRecoilState<string[]>(sucessProgram)
  const setError = useSetRecoilState<string[]>(errorProgram)
  const changedProgram = useChangedWarning()
  return (message: string[], typeMessage: "warning" | "error" | "sucess" | "changed" | "none") => {
    setWarning([""])
    setSucess([""])
    setError([""])
    if(typeMessage === "error"){
      const messageChanged = changedProgram
      setChanged([""])
      timerChanged = setTimeout(() => setChanged(messageChanged), 3000)
    } else {
      clearTimeout(timerChanged)
      clearTimeout(timerSucess)
      clearTimeout(timerError)
      setChanged([""])
    }
    if (typeMessage === "warning") {
      return setWarning(message)
    } else if (typeMessage === "error") {
      clearTimeout(timerError)
      timerError = setTimeout(() => setError([""]), 3000)
      return setError(message)
    } else if (typeMessage === "sucess") {
      clearTimeout(timerSucess)
      timerSucess = setTimeout(() => setSucess([""]), 3000)
      return setSucess(message)
    } else if (typeMessage === "changed") {
      clearTimeout(timerSucess)
      clearTimeout(timerError)
      return setChanged(message)
    } else {
      return
    }
  }
}