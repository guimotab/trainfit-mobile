import usePreferences from "../../state/hooks/usePreferences"
import { Button, StyleSheet, Text, View } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"


const Header = () => {
    const preferences = usePreferences()
    const navigation = useNavigation()
    React.useEffect(() => {
        if (!preferences.initializer) {
            navigation.navigate("Welcome")
        }
    }, [])

    return (
        <View>
            <View>
                <View >
                    <Text >TrainFit</Text>
                    <Button title="Home" onPress={event => navigation.navigate("Home")} />
                    <Button title="Configurações" onPress={event => navigation.navigate("Configuration")} />
                </View>
            </View>
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