import { useState } from "react"
import { font, cor } from "../../utils/presetStyles"
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput } from "react-native"
interface FilterProps {
    openFilter: boolean
    setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>
    setTypeFilter: React.Dispatch<React.SetStateAction<string>>
}

const Filter = ({ openFilter, setOpenFilter, setTypeFilter }: FilterProps) => {
    const [daysFilter, setDaysFilter] = useState("")

    function changeFilter() {
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
            setTypeFilter("Todos os dias")
        }
        setOpenFilter(false)
    }
    const trTbody = [
        {
            id: "7d",
            onPress: () => setDaysFilter("7d"),
            style: { display: "flex", justifyContent: "center", backgroundColor: cor.gray400, borderBottomWidth: 2, borderTopLeftRadius: 12 },
            td: "7d"
        },
        {
            id: "15d",
            onPress: () => setDaysFilter("15d"),
            style: { display: "flex", justifyContent: "center", backgroundColor: cor.gray400, borderBottomWidth: 2 },
            td: "15d"
        },
        {
            id: "30d",
            onPress: () => setDaysFilter("30d"),
            style: { display: "flex", justifyContent: "center", backgroundColor: cor.gray400, borderBottomWidth: 2, borderTopRightRadius: 12 },
            td: "30d"
        }, {
            id: "2m",
            onPress: () => setDaysFilter("2m"),
            style: { display: "flex", backgroundColor: cor.gray400, justifyContent: "center", borderBottomWidth: 2, borderBottomLeftRadius: 12 },
            td: "2m"
        }, {
            id: "6m",
            onPress: () => setDaysFilter("6m"),
            style: { display: "flex", backgroundColor: cor.gray400, justifyContent: "center", borderBottomWidth: 2 },
            td: "6m"
        }, {
            id: "todos",
            onPress: () => setDaysFilter("todos"),
            style: { display: "flex", backgroundColor: cor.gray400, justifyContent: "center", borderBottomWidth: 2, borderBottomRightRadius: 12 },
            td: "todos"
        }
    ]
    return (
        <>
            {openFilter ?
                <View style={styles.section}>
                    <Pressable style={styles.clickOutView} onPress={event => setOpenFilter(false)} />
                    <View style={styles.pressable}>
                        <View style={{ display: 'flex', marginTop: 10 }}>
                            <View>
                                <Text style={{ fontWeight: font.medium, fontSize: 16 }}>Últimos</Text>
                            </View>
                            <View style={styles.viewTable}>
                                {trTbody.map(tr =>
                                    <Pressable
                                        key={tr.id}
                                        id={tr.id}
                                        onPress={event => tr.onPress()}
                                        style={daysFilter === tr.id ? styles.viewTbodySelect : styles.viewTbodyDontSelect}>
                                        <Text>{tr.td}</Text>
                                    </Pressable>
                                )}
                            </View>
                        </View>
                        <View style={styles.viewPressable}>
                            <Pressable
                                onPress={event => setOpenFilter(false)}
                                style={styles.pressableCancel}>
                                <Text>Cancelar</Text>
                            </Pressable>
                            <Pressable
                                onPress={event => changeFilter()}
                                style={styles.pressableAccept}>
                                <Text>Aplicar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                :
                <></>
            }
        </>
    )
}
const styles = StyleSheet.create({
    section: {
        position: "absolute",
        display: "flex",
        alignItems: 'center',
        width: "100%",
        paddingHorizontal: 24,
        flex: 1,
        top: 0,
        left: 0,
        zIndex: 10
    },
    clickOutView: {
        flex: 1,
        backgroundColor: "#00000042",
        opacity: 1,
        height: 10000,
        width: 10000,
        zIndex: 0,
        left: 100,
        top: -7000,
    },
    pressable: {
        position: "absolute",
        backgroundColor: "#fff",
        width: "100%",
        height: 180,
        alignItems: 'center',
        borderRadius: 8,
        display: "flex",
        top: 40,
        flex: 1,
        paddingTop: 7,
        paddingHorizontal: 24,
        gap: 12
    },
    viewTable: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: 10,
    },
    viewTbodyDontSelect: {
        width: 82,
        height: 30,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: cor.gray400
    },
    viewTbodySelect: {
        width: 82,
        height: 30,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: cor.gray300,
        borderWidth: 2,
        borderColor: cor.secundaria
    },
    viewPressable: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 24,
        gap: 30
    },
    pressableCancel: {
        borderWidth: 2,
        borderColor: cor.gray400,
        borderRadius: 7,
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    pressableAccept: {
        borderWidth: 2,
        borderColor: cor.secundaria,
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderRadius: 7,
        color: "#fff"
    }

});
export default Filter