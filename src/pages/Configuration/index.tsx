import { Tables } from "../../models/Tables"
import useTables from "../../state/hooks/useTables"
import usePreferences from "../../state/hooks/usePreferences"
import MuscularGroup from "./MuscularGroup"
import useErrorProgram from "../../state/hooks/useErrorProgram"
import ErrorProgram from "../../components/ErrorProgram"
import { AsyncStorager } from "../../service/LocalStorager"
import { useUpdatePreferences } from "../../state/hooks/useUpdatePreferences"
import { IPreferencesWorkout } from "../../shared/interfaces/IPreferencesWorkout"
import { useUpdateTables } from "../../state/hooks/useUpdateTables"
import SucessProgram from "../../components/SucessProgram"
import useSucessProgram from "../../state/hooks/useSucessProgram"
import { useState } from "react"
import { useUpdateMessageProgram } from "../../state/hooks/useUpdateMessageProgram"
import { AllPreferences } from "../../models/AllPreferences"

const Configuration = () => {
    const preferences = new AllPreferences(usePreferences())
    const setPreferences = useUpdatePreferences()
    const erroProgram = useErrorProgram()
    const sucessProgram = useSucessProgram()
    const setMessageProgram = useUpdateMessageProgram()
    const tables = new Tables(useTables())
    const setTables = useUpdateTables()
    const [saveTable, setSaveTable] = useState(tables.tables)
    const [savePreferences, setSavePreferences] = useState(preferences.preferences)

    function addNewMuscularGroup() {
        const saveTables = new Tables(saveTable)
        let newId: number
        if (saveTables.tables[0]) {
            newId = saveTables.tables[saveTables.tables.length - 1].id + 1
        } else {
            newId = 1
        }
        const newPreference = {
            id: newId,
            nameMuscleGroup: "Novo Grupo " + newId,
            basesExercises: []
        } as IPreferencesWorkout
        saveTables.addNewTable(newPreference.id, newPreference.nameMuscleGroup, [])
        const fakePreferences = [...savePreferences]
        fakePreferences.push(newPreference)
        setSavePreferences(fakePreferences)
        setSaveTable(saveTables.tables)
    }
    function sucessAlert() {
        setMessageProgram(["Treinos salvos com sucesso!"], "sucess")
        setTables(saveTable)
        setPreferences({ initializer: preferences.initializer, preferencesWorkout: savePreferences })
        AsyncStorager.saveTables(saveTable)
        AsyncStorager.savePreferences({ initializer: preferences.initializer, preferencesWorkout: savePreferences })
    }
    return (
        <div className="relative flex flex-col items-center bg-gray-900 h-full min-h-screen w-full py-16 gap-5">
            <div className="flex flex-col max-w-7xl w-full gap-5 px-4 sm:px-12">
                <div className="flex flex-col justify-center sm:flex-row lg:justify-start items-center gap-5 h-fit lg:px-5">
                    <h1 className="font-bold text-2xl text-gray-200">Predefinição dos Treinos</h1>
                    <button
                        onClick={event => addNewMuscularGroup()}
                        className="text-gray-200 font-semibold text-lg px-3 py-1 rounded-lg bg-cor-secundaria hover:animate-hoverBGSH ">
                        Adicionar Grupo Muscular
                    </button>
                </div>
                <div className="flex justify-center w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-gray-700 w-fit lg:w-full rounded-2xl px-2 sm:px-8 py-5">
                        {savePreferences.map(preference =>
                            <MuscularGroup
                                key={preference.nameMuscleGroup}
                                preference={preference}
                                savePreferences={savePreferences}
                                saveTable={saveTable}
                                setSaveTable={setSaveTable}
                                setSavePreferences={setSavePreferences} />
                        ).reverse()}
                    </div>
                </div>
            </div>
            <ErrorProgram text={erroProgram} />
            <SucessProgram text={sucessProgram} />
            <div className="flex justify-end w-full max-w-7xl px-10">
                <button
                    onClick={event => sucessAlert()}
                    className="text-gray-200 font-semibold text-lg px-3 py-1 rounded-lg bg-cor-secundaria hover:animate-hoverBGSH ">
                    Salvar alterações
                </button>
            </div>
        </div>
    )
}
export default Configuration