import { Link } from "react-router-native"
import { AllPreferences } from "../../../models/AllPreferences"
import { MuscleGroup } from "../../../models/MuscleGroup"
import { Tables } from "../../../models/Tables"
import { AsyncStorager } from "../../../service/LocalStorager"
import usePreferences from "../../../state/hooks/usePreferences"
import useTables from "../../../state/hooks/useTables"
import { useUpdatePreferences } from "../../../state/hooks/useUpdatePreferences"
import { useUpdateTables } from "../../../state/hooks/useUpdateTables"

interface WarningDeleteTableProps {
    currentTable: MuscleGroup
    showWarning: boolean
    setShowWarning: React.Dispatch<React.SetStateAction<boolean>>
}
const WarningDeleteTable = ({ currentTable, showWarning, setShowWarning }: WarningDeleteTableProps) => {
    const tables = new Tables(useTables())
    const setTables = useUpdateTables()
    const preferences = new AllPreferences(usePreferences())
    const setPreferences = useUpdatePreferences()

    function deleteTable() {
        tables.removeTable(currentTable.id)
        preferences.removePreference(currentTable.id)
        setPreferences(preferences.returnInformation())
        setTables(tables.tables)
        setShowWarning(false)
        AsyncStorager.saveTables(tables.tables)
        AsyncStorager.savePreferences(preferences.returnInformation())
    }
    function cancelDelete() {
        setShowWarning(false)
    }
    return (
        <>
            {showWarning ?
                <div className="fixed flex justify-center w-screen h-screen z-10 left-0 top-0 px-8 pt-10">
                    <div className="flex flex-col items-center gap-1 max-w-[20rem] h-fit w-full bg-cor-secundaria rounded-lg px-4 py-1">
                        <div className="flex flex-col items-center">
                            <p className="text-gray-200 text-lg font-medium">{`Você irá excluir "${currentTable.name}"`}</p>
                            <p className="text-gray-200 text-lg font-medium">{"Você tem certeza?"}</p>
                        </div>
                        <div className="flex items-center justify-between w-full max-w-[10rem]">
                            <Link to={"/"} onPress={event => deleteTable()} className="bg-cor-terciaria hover:bg-cor-hover text-white font-medium px-4 py-[0.1rem] rounded-lg">Sim</Link>
                            <button onClick={event => cancelDelete()} className="bg-cor-terciaria hover:bg-cor-hover text-white font-medium px-4 py-[0.1rem] rounded-lg">Não</button>
                        </div>
                    </div>
                </div>
                : <></>
            }
        </>
    )
}

export default WarningDeleteTable