import { Button, StyleSheet, Text, View } from "react-native"
import { AllPreferences } from "../../models/AllPreferences"
import { Tables } from "../../models/Tables"
import usePreferences from "../../state/hooks/usePreferences"
import useTables from "../../state/hooks/useTables"
import { useUpdatePreferences } from "../../state/hooks/useUpdatePreferences"
import { useUpdateTables } from "../../state/hooks/useUpdateTables"
import AllWorkouts from "./AllWorkouts"
import { IPreferencesWorkout } from "../../shared/interfaces/IPreferencesWorkout"
import Navigation from "../../components/Navigation"
import { cor, font } from "../../utils/presetStyles"
const Teste = () =>{
    const tables = new Tables(useTables())
    const setTable = useUpdateTables()
    const preferences = new AllPreferences(usePreferences())
    const setPreferences = useUpdatePreferences()
    return(
        <View style={{backgroundColor: "#000"}}>
            <Text>Olá pessoal e gameplay</Text>
        </View>
    )
}
export default Teste