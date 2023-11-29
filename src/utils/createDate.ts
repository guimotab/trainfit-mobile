import dayjs from "dayjs"

export function createDate(sumDays: number = 0) {
    const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
    const day = new Date().getDate() + sumDays
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    return `${day} de ${months[month]} de ${year}`
}
// export function findFilterDays(typeFilter: string) {
//     const currentDate = new Date()
//     let dateStart = new Date()
//     if(typeFilter === "Últimos 7 dias"){
//         dateStart = dayMonthYearToDate(createDate(), 7)
//     } else if(typeFilter === "Últimos 15 dias"){
//         dateStart = dayMonthYearToDate(createDate(), 15)
//     }else if(typeFilter === "Últimos 30 dias"){
//         dateStart = dayMonthYearToDate(createDate(), 30)
//     }else if(typeFilter === "Últimos 2 meses"){
//         dateStart = dayMonthYearToDate(createDate(), 60)
//     }else if(typeFilter === "Últimos 6 meses"){
//         dateStart = dayMonthYearToDate(createDate(), 180)
//     }else if(typeFilter === "Últimos 12 meses"){
//         dateStart = dayMonthYearToDate(createDate(), 360)
//     }
//     return [dateStart, currentDate]
// }
export function newFindFilterDays(typeFilter: string) {
    const currentDate = new Date()
    let dateStart = new Date()
    if(typeFilter === "Últimos 7 dias"){
        dateStart = newDayMonthYearToDate(createDate(), 7)
    } else if(typeFilter === "Últimos 15 dias"){
        dateStart = newDayMonthYearToDate(createDate(), 15)
    }else if(typeFilter === "Últimos 30 dias"){
        dateStart = newDayMonthYearToDate(createDate(), 30)
    }else if(typeFilter === "Últimos 2 meses"){
        dateStart = newDayMonthYearToDate(createDate(), 60)
    }else if(typeFilter === "Últimos 6 meses"){
        dateStart = newDayMonthYearToDate(createDate(), 180)
    }else if(typeFilter === "Últimos 12 meses"){
        dateStart = newDayMonthYearToDate(createDate(), 360)
    }
    return [dateStart, currentDate]
}
export function newDayMonthYearToDate(date: string, subtractionDays=0){
    const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
    const resultDate = date.split(" de ")
    let dayDate = Number(resultDate[0])
    let monthDate = resultDate[1]
    let yearDate = Number(resultDate[2])
    let indexMonthDate = months.findIndex(month => month === monthDate)
    return dayjs(`${indexMonthDate+1}/${dayDate}/${yearDate}`).subtract(subtractionDays, "days").toDate()
}

// export function dayMonthYearToDate(date: string, subtractionDays = 0) {
//     const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
//     const resultDate = date.split(" de ")
//     let dayDate = Number(resultDate[0])
//     let monthDate = resultDate[1]
//     let yearDate = Number(resultDate[2])
//     let indexMonthDate = months.findIndex(month => month === monthDate)
//     if (subtractionDays >= dayDate) {
//         let result = subtractionDays - dayDate
//         while (result >= dayDate) {
//             dayDate = daysOnMonth(indexMonthDate, yearDate)
//             indexMonthDate -= 1
//             if(dayDate <= result){
//                 result -= dayDate
//             }
//         }
//         if (result !== 0) {
//             dayDate -= result
//             indexMonthDate -= 1
//         } else if (result === 0) {
//             dayDate = daysOnMonth(indexMonthDate, yearDate)
//             indexMonthDate -= 1
//         }
//     } else {
//         dayDate -= subtractionDays
//     }
//     const day = new Date(`${indexMonthDate + 1}/${dayDate}/${yearDate}`)
//     return day
// }
export function returnStartEndDate(date: string){
    const [startDate, endDate] = date.split("-")
    let result = startDate.split("/")
    const revertStartDate = `${result[1]}/${result[0]}/${result[2]}`
    result = endDate.split("/")
    const revertEndDate = `${result[1]}/${result[0]}/${result[2]}`
    return [new Date(revertStartDate), new Date(revertEndDate)]

}
function daysOnMonth(mes: number, ano: number) {
    var data = new Date(ano, mes, 0);
    return data.getDate();
}