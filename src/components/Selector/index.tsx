import { StyleSheet, Text, View, Pressable, ScrollView, TextInput } from "react-native"
import { cor, font } from "../../utils/presetStyles"
import { useState } from "react"
interface Selector {
    arrayElements: string[]
}

const Selector = ({ arrayElements }: Selector) => {
    const [openSelector, setOpenSelector] = useState(false)
    return (
        <>
            {openSelector ?
                <View style={styles.section}>
                    {/* <Pressable style={styles.closeView} onPress={event => setOpenSelector(false)}></Pressable> */}
                    <View style={styles.view}>
                        {arrayElements.map((element, index) => <Text key={index} style={styles.viewText}>{element}</Text>)}
                    </View>
                </View >
                :
                <></>
            }
            <Pressable style={styles.pressable} onPress={event => setOpenSelector(true)}>

            </Pressable>
        </>
    )
}
const styles = StyleSheet.create({
    section: {
        zIndex: 10,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: cor.gray900,
        flex: 1,
        top: 0,
    left: 0
    },
    closeView: {
        flex: 1,
    },
    view: {
        display: "flex",
        backgroundColor: cor.gray200,
        width: "90%"
    },
    viewText: {
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    pressable: {
        backgroundColor: cor.gray200,
        width: "100%",
        height: 27,
        borderRadius: 8
    }
});
export default Selector