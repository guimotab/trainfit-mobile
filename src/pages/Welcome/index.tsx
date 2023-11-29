import { AiOutlinePlusCircle } from 'react-icons/ai'
import useTables from '../../state/hooks/useTables'
import { useUpdateTables } from '../../state/hooks/useUpdateTables'
import usePreferences from '../../state/hooks/usePreferences'
import { useUpdatePreferences } from '../../state/hooks/useUpdatePreferences'
import { Tables } from '../../models/Tables'
import InputNameMuscles from './InputNameMuscles'
import { Link } from 'react-router-native'
import { IPreferencesWorkout } from '../../shared/interfaces/IPreferencesWorkout'
import { AllPreferences } from '../../models/AllPreferences'
import ErrorProgram from '../../components/ErrorProgram'
import useErrorProgram from '../../state/hooks/useErrorProgram'

const Welcome = () => {
    const tables = new Tables(useTables())
    const setTables = useUpdateTables()
    const preferences = new AllPreferences(usePreferences())
    const setPreferences = useUpdatePreferences()
    const erroProgram = useErrorProgram()
    function addNewMuscularGroup() {
        let newId : number
        if(tables.tables[0]){
            newId = tables.tables[tables.tables.length - 1].id + 1
        } else {
            newId = 1
        }
        const newPreference = {
            id: newId,
            nameMuscleGroup: "Novo Grupo " + newId,
            basesExercises: []
        } as IPreferencesWorkout
        tables.addNewTable(newPreference.id, newPreference.nameMuscleGroup, [])
        preferences.pushPreference(newPreference)
        setPreferences(preferences.returnInformation())
        setTables(tables.tables)
    }
    
    return (
        <section className="flex justify-center bg-gray-900 h-full min-h-screen w-full py-10">
            <div className="flex justify-center max-w-7xl w-full px-10">
                <div className='flex flex-col max-w-5xl gap-6 w-full animate-entraceWelcome'>
                    <h1 className="text-gray-200 font-semibold text-3xl">Olá! Bem vindo ao <span className="text-cor-hover font-bold ">TrainFit!</span></h1>
                    <div className='flex flex-col gap-5'>
                        <div className='flex items-center gap-3'>
                            <h2 className="text-gray-200 font-semibold text-2xl">Crie sua divisão de grupos musculares</h2>
                            <AiOutlinePlusCircle size={28} onClick={event=>addNewMuscularGroup()} className='text-gray-200 cursor-pointer hover:animate-hoverWH' />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-y-6 mt-3 px-6'>
                        {tables.tables.map(table => <InputNameMuscles key={table.id} table={table} />)}
                    </div>
                    {tables.tables[0] ?
                        <Link
                            id='button-to-criarExercicios'
                            to={"../criarExercicios"}
                            className='self-end text-gray-200 text-lg font-medium lg:border-2 border-cor-secundaria bg-cor-secundaria lg:bg-transparent lg:hover:animate-hoverTH px-3 py-1 mt-2 rounded-lg'>Próximo</Link>
                        :
                        <button
                            className='self-end text-gray-400 text-lg font-medium lg:border-2 border-gray-600 lg:bg-transparent hover:cursor-not-allowed px-3 py-1 mt-2 rounded-lg'>Próximo</button>
                    }
                </div>
            </div>
            <ErrorProgram text={erroProgram} />
        </section>
    )
}
export default Welcome