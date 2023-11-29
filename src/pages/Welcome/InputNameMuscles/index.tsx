import { useState } from "react"
import { IMuscleGroup } from "../../../shared/interfaces/IMuscleGroup"
import { IoMdTrash } from "react-icons/io"
import { AllPreferences } from "../../../models/AllPreferences"
import { MuscleGroup } from "../../../models/MuscleGroup"
import { PreferencesWorkout } from "../../../models/PreferencesWorkout"
import { Tables } from "../../../models/Tables"
import usePreferences from "../../../state/hooks/usePreferences"
import useTables from "../../../state/hooks/useTables"
import { useUpdatePreferences } from "../../../state/hooks/useUpdatePreferences"
import { useUpdateTables } from "../../../state/hooks/useUpdateTables"
import { useUpdateMessageProgram } from "../../../state/hooks/useUpdateMessageProgram"

interface InputNameMusclesProps {
    table: IMuscleGroup
}

const InputNameMuscles = ({ table }: InputNameMusclesProps) => {
    const tables = new Tables(useTables())
    const setTables = useUpdateTables()
    const preferences = new AllPreferences(usePreferences())
    const setPreferences = useUpdatePreferences()
    const setMessageProgram = useUpdateMessageProgram()
    const [name, setName] = useState(table.name)
    function deleteMuscularGroup() {
        //save on the table
        tables.removeTable(table.id)
        setTables(tables.tables)
        //save on the preferences
        const fakePreferences = [...preferences.preferences]
        const indexPreferences = fakePreferences.findIndex(thisPreference => thisPreference.nameMuscleGroup === table.name)
        fakePreferences.splice(indexPreferences, 1)
        setPreferences({initializer: preferences.initializer, preferencesWorkout: fakePreferences})
    }
    function editNameMuscularGroup(value: string) {
        const findValueIquals = tables.tables.find(thisTable => thisTable.name === value)
        const isThisElement = value === table.name
        if (value === "") {
            setName(table.name)
            setMessageProgram(["O campo não pode ficar vazio!"], "error")
        } else {
            if (!findValueIquals) {
                //save on the table
                const thisTable = new MuscleGroup(table)
                thisTable.name = value
                tables.updateTables(thisTable)
                setTables(tables.tables)
                //save on the preferences
                const fakePreferences = [...preferences.preferences]
                const indexPreferences = fakePreferences.findIndex(preference => preference.nameMuscleGroup === table.name)
                const preferenceWorkout = new PreferencesWorkout(preferences.preferences[indexPreferences])
                preferenceWorkout.nameMuscleGroup = value
                fakePreferences.splice(indexPreferences, 1, preferenceWorkout.returnPreferences())
                setPreferences({ initializer: preferences.initializer, preferencesWorkout: fakePreferences })
                setName(value)
            } else if (!isThisElement) {
                setName(table.name)
                setMessageProgram(["Esse grupo muscular já foi criado!"], "error")
            }
        }
    }
    return (
        <div className="flex items-center justify-center px-14 w-full gap-3">
            <div className="flex items-center gap-3 border-2 border-cor-secundaria hover:animate-hoverBorderSH rounded-xl">
                <input
                    maxLength={27}
                    value={name}
                    onChange={event => setName(event.target.value)}
                    onBlur={event => editNameMuscularGroup(event.target.value)}
                    className="px-4 py-1 bg-transparent text-gray-200 font-medium text-xl w-full max-w-[17rem]" />
            </div>
            <IoMdTrash size={22} onClick={event => deleteMuscularGroup()} className="text-gray-200 hover:animate-hoverTrash" />
        </div>
    )
}
export default InputNameMuscles