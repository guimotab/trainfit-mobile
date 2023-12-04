import Icon from 'react-native-vector-icons/FontAwesome5'
import { useState } from "react"
import { IMuscleGroup } from "../../../shared/interfaces/IMuscleGroup"
import { AllPreferences } from "../../../models/AllPreferences"
import { MuscleGroup } from "../../../models/MuscleGroup"
import { PreferencesWorkout } from "../../../models/PreferencesWorkout"
import { Tables } from "../../../models/Tables"
import usePreferences from "../../../state/hooks/usePreferences"
import useTables from "../../../state/hooks/useTables"
import { useUpdatePreferences } from "../../../state/hooks/useUpdatePreferences"
import { useUpdateTables } from "../../../state/hooks/useUpdateTables"
import { useUpdateMessageProgram } from "../../../state/hooks/useUpdateMessageProgram"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { cor } from '../../../utils/presetStyles'

interface InputNameMusclesProps {
    table: IMuscleGroup
}

const InputNameMuscles = ({ table }: InputNameMusclesProps) => {
    const tables = new Tables(useTables())
    const setTables = useUpdateTables()
    const preferences = new AllPreferences(usePreferences())
    const setPreferences = useUpdatePreferences()
    const setMessageProgram = useUpdateMessageProgram()
    const [name, setName] = useState(table.name)
    function deleteMuscularGroup() {
        //save on the table
        tables.removeTable(table.id)
        setTables(tables.tables)
        //save on the preferences
        const fakePreferences = [...preferences.preferences]
        const indexPreferences = fakePreferences.findIndex(thisPreference => thisPreference.nameMuscleGroup === table.name)
        fakePreferences.splice(indexPreferences, 1)
        setPreferences({initializer: preferences.initializer, preferencesWorkout: fakePreferences})
    }
    function editNameMuscularGroup() {
        const value = name
        const findValueIquals = tables.tables.find(thisTable => thisTable.name === value)
        const isThisElement = value === table.name
        if (value === "") {
            setName(table.name)
            setMessageProgram(["O campo não pode ficar vazio!"], "error")
        } else {
            if (!findValueIquals) {
                //save on the table
                const thisTable = new MuscleGroup(table)
                thisTable.name = value
                tables.updateTables(thisTable)
                setTables(tables.tables)
                //save on the preferences
                const fakePreferences = [...preferences.preferences]
                const indexPreferences = fakePreferences.findIndex(preference => preference.nameMuscleGroup === table.name)
                const preferenceWorkout = new PreferencesWorkout(preferences.preferences[indexPreferences])
                preferenceWorkout.nameMuscleGroup = value
                fakePreferences.splice(indexPreferences, 1, preferenceWorkout.returnPreferences())
                setPreferences({ initializer: preferences.initializer, preferencesWorkout: fakePreferences })
                setName(value)
            } else if (!isThisElement) {
                setName(table.name)
                setMessageProgram(["Esse grupo muscular já foi criado!"], "error")
            }
        }
    }
    return (
        <View style={styles.section}>
            <View style={styles.divSection}>
                <TextInput
                    maxLength={27}
                    value={name}
                    onChangeText={text=>setName(text)}
                    onEndEditing={event => editNameMuscularGroup()}
                    style={styles.text} />
            </View>
            <Icon name="trash" size={20} onPress={event => deleteMuscularGroup()} style={styles.icon} />
        </View>
    )
}
const styles = StyleSheet.create({
    section: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "auto",
        paddingHorizontal: 26,
        gap: 12
    },
    divSection: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#176B87",
        rowGap: 15,
    },
    text: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        backgroundColor: "transparent",
        color: cor.gray200, //200,
        fontWeight: "500", //semibold
        fontSize: 20, //xl,
    },
    icon: {
        color: "#fff",//200
        //"hover:animate-hoverTrash"
    },
    
})
export default InputNameMuscles