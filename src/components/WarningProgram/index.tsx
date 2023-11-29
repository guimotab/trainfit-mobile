import { AsyncStorager } from "../../service/LocalStorager"
import { IMuscleGroup } from "../../shared/interfaces/IMuscleGroup"
import useTables from "../../state/hooks/useTables"
import { useUpdateTables } from "../../state/hooks/useUpdateTables"
import { useUpdateMessageProgram } from "../../state/hooks/useUpdateMessageProgram"

interface WarningProgramProps {
    text: string[]
    saveTable?: IMuscleGroup[]
    setSaveTable?: React.Dispatch<React.SetStateAction<IMuscleGroup[]>>
}
const WarningProgram = ({ text, saveTable, setSaveTable }: WarningProgramProps) => {
    const tables = useTables()
    const setTables = useUpdateTables()
    const setMessageProgram = useUpdateMessageProgram()
    function cancelChanges() {
        setMessageProgram([""], "none")
        if (setSaveTable) {
            setSaveTable(tables)
        }
    }
    function saveChange() {
        setMessageProgram([""], "none")
        if (setSaveTable && saveTable) {
            setSaveTable(saveTable)
            setTables(saveTable)
            AsyncStorager.saveTables(saveTable)
        }
    }
    return (
        <>
            {text[0] !== "" ?
                <div className="flex fixed top-0 justify-center w-full h-screen left-0 z-10">
                    <div className="flex flex-col gap-1 bg-cor-secundaria h-fit w-fit rounded-lg mt-16 px-8 py-1.5 ">
                        <div className="flex flex-col items-center">
                            {text.map(text => <p className="text-gray-200 text-lg font-medium">{text}</p>)}
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <button onClick={event => saveChange()} className="bg-cor-terciaria hover:bg-cor-hover text-white font-medium px-3 py-[0.1rem] rounded-lg">Salvar</button>
                            <button onClick={event => cancelChanges()} className="bg-cor-terciaria hover:bg-cor-hover text-white font-medium px-3 py-[0.1rem] rounded-lg">Desfazer</button>
                        </div>
                    </div>
                </div>
                : <></>
            }
        </>
    )
}
export default WarningProgram