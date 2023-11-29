import { Link, useNavigate } from "react-router-native"
import usePreferences from "../../../state/hooks/usePreferences"
import ExercisesMuscleGroup from "../ExercisesMuscleGroup"
import { AllPreferences } from "../../../models/AllPreferences"
import ErrorProgram from "../../../components/ErrorProgram"
import useErrorProgram from "../../../state/hooks/useErrorProgram"

const CreateExercises = () => {
    const navigate = useNavigate()
    const preferences = new AllPreferences(usePreferences())
    const erroProgram = useErrorProgram()
    return (
        <section className="flex justify-center bg-gray-900 h-full min-h-screen w-full py-10 ">
            <div className="flex justify-center max-w-7xl w-full px-10 animate-entraceWelcome">
                <div className='flex flex-col max-w-5xl gap-7 w-full'>
                    <div className='flex flex-col gap-5'>
                        <h1 className="text-gray-200 font-semibold text-3xl">Muito <span className="text-cor-hover font-bold ">Bom!</span></h1>
                        <h2 className="text-gray-200 font-semibold text-2xl">Agora adicione os exercícios de cada grupo!</h2>
                    </div>
                    <div className='grid grid-cols-2 gap-y-6 mt-3 px-6'>
                        {preferences.preferences.map(preference => <ExercisesMuscleGroup key={preference.id} preference={preference} />)}
                    </div>
                    <div className="flex items-center justify-between w-full px-6">
                        <button
                            onClick={event => navigate(-1)}
                            className='self-end w-fit text-gray-200 text-lg font-medium lg:border-2 border-cor-secundaria bg-cor-secundaria lg:bg-transparent lg:hover:animate-hoverTH px-3 py-1 mt-2 rounded-lg'>Voltar</button>
                        <Link
                            to={"../estilizarGrupos"}
                            className='self-end w-fit text-gray-200 text-lg font-medium lg:border-2 border-cor-secundaria bg-cor-secundaria lg:bg-transparent lg:hover:animate-hoverTH px-3 py-1 mt-2 rounded-lg'>Próximo</Link>
                    </div>
                </div>
            </div>
            <ErrorProgram text={erroProgram} />
        </section>
    )
}
export default CreateExercises