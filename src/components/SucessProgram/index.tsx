interface SucessProgramProps {
    text: string[]
}
const SucessProgram = ({ text }: SucessProgramProps) => {
    return (
        <>
            {text[0] !== "" ?
                <div className="fixed flex flex-col gap-1 items-center bg-green-700 w-fit rounded-lg px-4 top-10 animate-showMessage">
                    {text.map(text=><p className="text-gray-200 text-lg font-medium">{text}</p>)}
                </div>
                : <></>
            }
        </>
    )
}
export default SucessProgram