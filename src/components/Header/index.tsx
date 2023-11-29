import usePreferences from "../../state/hooks/usePreferences"
import { Link, Outlet, useNavigate } from "react-router-native"
import { Button, StyleSheet, Text, View } from "react-native"
import React from "react"
const Header = () => {
    const preferences = usePreferences()
    React.useEffect(() => {
        const navigate = useNavigate()
        if (!preferences.initializer) {
            navigate("/inicializar/criarGrupos")
        }
    }, [])

    return (
        <View>
            <View>
                <View >
                    <Text >TrainFit</Text>
                    <Link to={"/"} >
                        <Text>Home</Text>
                    </Link>
                    <Link to={"/configuracoes"} >
                        <Text>Configurações</Text>
                    </Link>
                </View>
            </View>
            <Outlet />
        </View>
        // <View>
        //     <View className="flex justify-center items-center bg-cor-terciaria h-14 w-full px-8 md:px-20">
        //         <View className="flex gap-10 justify-center sm:justify-start items-center max-w-7xl w-full">
        //             <Text className="hidden sm:block text-white font-bold text-xl">TrainFit</Text>
        //             <Link to={"/"} className="font-medium text-lg text-white">
        //                 <Text>Home</Text>
        //             </Link>
        //             <Link to={"/configuracoes"} className="font-medium text-lg text-white">
        //                 <Text>Configurações</Text>
        //             </Link>
        //         </View>
        //     </View>
        //     <Outlet />
        // </View>

    )
}
export default Header