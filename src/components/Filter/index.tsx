import dayjs from "dayjs"
import { useEffect, useState } from "react"
interface FilterProps {
    openFilter: boolean
    setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>
    setTypeFilter: React.Dispatch<React.SetStateAction<string>>
}

const Filter = ({ openFilter, setOpenFilter, setTypeFilter }: FilterProps) => {
    const [daysFilter, setDaysFilter] = useState("")
    const [dateFilter1, setDateFilter1] = useState(dayjs())
    const [dateFilter2, setDateFilter2] = useState(dayjs())
    const [dateOriginal1, setDateOriginal1] = useState<string>(`${dayjs().date()}/${dayjs().month() + 1}/${dayjs().year()}`)
    const [dateOriginal2, setDateOriginal2] = useState<string>(`${dayjs().date()}/${dayjs().month() + 1}/${dayjs().year()}`)
    useEffect(() => {
        if (daysFilter !== "") {
            const day = daysFilter.split('d')[0]
            const month = daysFilter.split('m')[0]
            if (day === "7" || day === "15" || day === "30") {
                setDateFilter1(dayjs().subtract(Number(day), "days"))
            } else if (month === "2" || month === "6" || month === "12") {
                setDateFilter1(dayjs().subtract(Number(month) * 30, "days"))
            }
            setDateFilter2(dayjs())
        }
    }, [daysFilter])
    function changeDateField(date: dayjs.Dayjs, numberField: number) {
        if (numberField === 1) {
            setDateOriginal1(`${date.date()}/${date.month() + 1}/${date.year()}`)
            setDateFilter1(date)
        } else {
            setDateOriginal2(`${date.date()}/${date.month() + 1}/${date.year()}`)
            setDateFilter2(date)
        }
    }
    function cancelDateField() {
        setDaysFilter("")
        const allTd = document.querySelectorAll("[data-filtertd]") as NodeListOf<HTMLElement>
        allTd.forEach(td => td.classList.remove("bg-gray-300"))
    }
    function changeFilter() {
        if (daysFilter !== "") {
            if (daysFilter === "7d") {
                setTypeFilter("Últimos 7 dias")
            } else if (daysFilter === "15d") {
                setTypeFilter("Últimos 15 dias")
            } else if (daysFilter === "30d") {
                setTypeFilter("Últimos 30 dias")
            } else if (daysFilter === "2m") {
                setTypeFilter("Últimos 2 meses")
            } else if (daysFilter === "6m") {
                setTypeFilter("Últimos 6 meses")
            } else if (daysFilter === "todos") {
                setTypeFilter("Todos")
            }
        } else {
            setTypeFilter(dateOriginal1 + "-" + dateOriginal2)
        }
        setOpenFilter(false)
    }
    function changeColorFilter(typeFilter: string) {
        const allTd = document.querySelectorAll("[data-filtertd]") as NodeListOf<HTMLElement>
        allTd.forEach(td => {
            if (td.dataset.filtertd + "" === typeFilter) {
                td.classList.add("bg-gray-300")
                setDaysFilter(td.dataset.filtertd + "")
            } else {
                td.classList.remove("bg-gray-300")
            }
        })
    }
    const trTbordy = [
        {
            id: "typeFilter-7d",
            filtertd: "7d",
            onClick: () => changeColorFilter("7d"),
            className: "rounded-tl-md",
            td: "7d"
        },
        {
            id: "typeFilter-15d",
            filtertd: "15d",
            onClick: () => changeColorFilter("15d"),
            className: "",
            td: "15d"
        },
        {
            id: "typeFilter-30d",
            filtertd: "30d",
            onClick: () => changeColorFilter("30d"),
            className: "rounded-tr-md",
            td: "30d"
        }, {
            id: "typeFilter-2m",
            filtertd: "2m",
            onClick: () => changeColorFilter("2m"),
            className: "rounded-bl-md",
            td: "2m"
        }, {
            id: "typeFilter-6m",
            filtertd: "6m",
            onClick: () => changeColorFilter("6m"),
            className: "",
            td: "6m"
        }, {
            id: "typeFilter-todos",
            filtertd: "todos",
            onClick: () => changeColorFilter("todos"),
            className: "rounded-br-md",
            td: "todos"
        }
    ]
    return (
        <>
            {/* {openFilter ?
                <div className="fixed flex flex-col items-center w-screen h-screen top-0 left-0 z-10">
                    <div className="bg-white bg-opacity-20 w-screen h-screen" onClick={event => setOpenFilter(false)}>
                    </div>
                    <div className="absolute flex flex-col items-center top-24 bg-white rounded-lg px-6 py-6 gap-5">
                        <div className="flex items-center gap-4 ">
                            <DateField
                                id="dateField-1"
                                value={dateFilter1}
                                onClick={event => cancelDateField()}
                                onChange={event => changeDateField(event!, 1)}
                                className="max-w-[9rem]" />
                            <p>até</p>
                            <DateField
                                id="dateField-2"
                                value={dateFilter2}
                                onClick={event => cancelDateField()}
                                onChange={event => changeDateField(event!, 2)}
                                className="max-w-[9rem]" />
                        </div>
                        <table className="flex flex-col w-full">
                            <tbody>
                                <tr>
                                    <th className="self-start font-medium">Últimos</th>
                                </tr>
                            </tbody>
                            <tbody className="grid grid-cols-3 w-full">
                                {trTbordy.map(tr =>
                                    <tr
                                        key={tr.id}
                                        id={tr.id}
                                        data-filtertd={tr.filtertd}
                                        onClick={event => tr.onClick()}
                                        className={"flex justify-center border border-gray-400 hover:bg-gray-200 cursor-pointer " + tr.className}>
                                        <td>{tr.td}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="flex items-center justify-between w-full px-14">
                            <button
                                onClick={event => setOpenFilter(false)}
                                className="border border-gray-400 rounded-md px-4 py-1">
                                Cancelar
                            </button>
                            <button
                                onClick={event => changeFilter()}
                                className="bg-cor-secundaria rounded-md px-4 py-1 text-white hover:bg-cor-hover">
                                Aplicar
                            </button>
                        </div>
                    </div>
                </div>
                :
                <></>
            } */}
        </>
    )
}
export default Filter