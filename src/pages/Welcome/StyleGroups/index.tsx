import { useNavigate } from "react-router-native"
import { Tables } from "../../../models/Tables"
import usePreferences from "../../../state/hooks/usePreferences"
import useTables from "../../../state/hooks/useTables"
import { AsyncStorager } from "../../../service/LocalStorager"
import { AllPreferences } from "../../../models/AllPreferences"
import { useUpdatePreferences } from "../../../state/hooks/useUpdatePreferences"
import Styles from "./Styles"

const StyleGroups = () =>{
    const navigate = useNavigate()
    const tables = new Tables(useTables())
    const preferences = new AllPreferences(usePreferences())
    const setPreferences = useUpdatePreferences()
    function saveInformations(){
        preferences.initializer = true
        AsyncStorager.saveTables(tables.tables)
        AsyncStorager.savePreferences(preferences.returnInformation())
        setPreferences(preferences.returnInformation())
        navigate("/")
    }
    return(
        <section className="flex justify-center bg-gray-900 h-full min-h-screen w-full py-10">
            <div className="flex justify-center max-w-7xl w-full px-10">
                <div className='flex flex-col max-w-5xl gap-7 w-full animate-entraceWelcome'>
                    <div className='flex flex-col gap-5'>
                        <h1 className="text-gray-200 font-semibold text-3xl">Falta <span className="text-cor-hover font-bold ">Pouco!</span></h1>
                        <h2 className="text-gray-200 font-semibold text-2xl">Estilize os ícones de cada grupo muscular! (opcional)</h2>
                    </div>
                    <div className='grid grid-cols-2 gap-y-6 mt-3 px-6'>
                        {preferences.preferences.map(preference => <Styles key={preference.id} preference={preference} />)}
                    </div>
                    <div className="flex items-center justify-between w-full px-6">
                        <button
                            onClick={event => navigate(-1)}
                            className='self-end w-fit text-gray-200 text-lg font-medium lg:border-2 border-cor-secundaria bg-cor-secundaria lg:bg-transparent lg:hover:animate-hoverTH px-3 py-1 mt-2 rounded-lg'>Voltar</button>
                        <button
                            onClick={event=>saveInformations()}
                            className='self-end w-fit text-gray-200 text-lg font-medium lg:border-2 border-cor-secundaria bg-cor-secundaria lg:bg-transparent lg:hover:animate-hoverTH px-3 py-1 mt-2 rounded-lg'>Próximo</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StyleGroups