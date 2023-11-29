import { GiWeightLiftingUp } from "react-icons/gi"
import IconCardio from "../../../../../assets/svg/cardio.svg"
import IconHalter from "../../../../../assets/svg/halter.svg"
import IconSupino from "../../../../../assets/svg/supino.svg"
import IconLevantamentoTerra from "../../../../../assets/svg/levantamentoTerra.svg"
import IconSeringa from "../../../../../assets/svg/seringa.svg"
import IconWhey from "../../../../../assets/svg/whey.svg"
import { IPreferencesWorkout } from "../../../../shared/interfaces/IPreferencesWorkout"
import findCurrentTable from "../../../../utils/findCurrentTable"
import useTables from "../../../../state/hooks/useTables"
import { Tables } from "../../../../models/Tables"
import { MuscleGroup } from "../../../../models/MuscleGroup"
import { useUpdateTables } from "../../../../state/hooks/useUpdateTables"
import { JSXElement } from "@babel/types"
import { IconType } from "react-icons/lib"
interface StylesProps {
    preference: IPreferencesWorkout
}

const Styles = ({ preference }: StylesProps) => {
    const tables = new Tables(useTables())
    const setTables = useUpdateTables()
    const currentTable = new MuscleGroup(findCurrentTable(tables.tables, preference.id.toString()))
    function chooseIcon(idIcon: string) {
        const elements = document.querySelectorAll("[data-iconWorkout]") as NodeListOf<HTMLElement>
        elements.forEach(element => {
            if (element.id === idIcon) {
                element.classList.add("text-cor-hover")
                element.classList.remove("text-gray-500")
                element.classList.remove("hover:text-gray-300")
            } else if (element.dataset.iconWorkout === preference.nameMuscleGroup) {
                element.classList.remove("text-cor-hover")
                element.classList.add("text-gray-500")
                element.classList.add("hover:text-gray-300")
            }
        })
        const result = idIcon.split("-")
        let logo = result[0] + result[1]
        if (result[1] === "GiWeightLiftingUp") {
            logo = result[1]
        }
        currentTable.logo = logo
        tables.updateTables(currentTable)
        setTables(tables.tables)
    }
    const icons = [
        {
            icon: IconCardio,
            id: `icon-Cardio-${preference.nameMuscleGroup}`,
            onClick: () => chooseIcon(`icon-Cardio-${preference.nameMuscleGroup}`),
        }, {
            icon: IconHalter,
            id: `icon-Halter-${preference.nameMuscleGroup}`,
            onClick: () => chooseIcon(`icon-Halter-${preference.nameMuscleGroup}`),
        }, {
            icon: IconSupino,
            id: `icon-Supino-${preference.nameMuscleGroup}`,
            onClick: () => chooseIcon(`icon-Supino-${preference.nameMuscleGroup}`),
        }, {
            icon: IconLevantamentoTerra,
            id: `icon-LevantamentoTerra-${preference.nameMuscleGroup}`,
            onClick: () => chooseIcon(`icon-LevantamentoTerra-${preference.nameMuscleGroup}`),
        }, {
            icon: IconSeringa,
            id: `icon-Seringa-${preference.nameMuscleGroup}`,
            onClick: () => chooseIcon(`icon-Seringa-${preference.nameMuscleGroup}`),
        },{
            icon: IconWhey,
            id: `icon-Whey-${preference.nameMuscleGroup}`,
            onClick: () => chooseIcon(`icon-Whey-${preference.nameMuscleGroup}`),
        },{
            icon: GiWeightLiftingUp as IconType,
            id: `icon-GiWeightLiftingUp-${preference.nameMuscleGroup}`,
            onClick: () => chooseIcon(`icon-GiWeightLiftingUp-${preference.nameMuscleGroup}`),
        },
    ]

    return (
        <div className="flex items-center justify-center px-6 w-full">
            <div className="flex flex-col justify-center w-full border-2 border-cor-secundaria hover:animate-hoverBorderSH rounded-xl px-6 py-2 gap-3">
                <div className="flex items-center gap-3">
                    <p className="py-1 bg-transparent text-gray-200 font-medium text-2xl" >
                        {preference.nameMuscleGroup}
                    </p>
                </div>
                <div className="grid grid-cols-4 gap-y-5 pb-4 w-full">
                    {icons.map(icon =>
                        <div key={icon.id} className="flex justify-center">
                            <icon.icon
                                data-iconWorkout={preference.nameMuscleGroup}
                                id={icon.id}
                                onClick={icon.onClick}
                                className="w-10 h-10 text-gray-500 hover:text-gray-300" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Styles