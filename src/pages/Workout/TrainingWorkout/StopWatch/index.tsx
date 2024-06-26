import { View, StyleSheet, Text } from "react-native"
import { cor, font } from "../../../../utils/presetStyles";
import { useState } from "react";
import Stopwatch from "react-native-vector-icons/Fontisto"
import Stop from "react-native-vector-icons/Entypo"

const StopWatch = () => {
  const [stopWatchStarted, setStopWatchStarted] = useState(false)

  function handleStopWatch(){
    setStopWatchStarted(!stopWatchStarted)
  }

  return (
    <>
      {stopWatchStarted ?
        <View style={styles.sectionNotStarted}>
          <Stop name="controller-stop" style={{...styles.icon, paddingHorizontal:10, backgroundColor: cor.erro}} onPress={handleStopWatch}/>
          <View style={{alignSelf: "center"}}>
            <Text style={{}}>00:00</Text>
          </View>
          <Stop name="controller-stop" style={{...styles.icon, paddingHorizontal:10, backgroundColor: cor.erro}} onPress={handleStopWatch}/>
        </View>
        :
        <View style={{...styles.sectionNotStarted, justifyContent: "flex-end"}}>
          <Stopwatch name="stopwatch" style={{...styles.icon}} onPress={handleStopWatch}/>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  sectionNotStarted: {
    //"flex flex-col bg-gray-700 rounded-2xl px-7 py-4 gap-3"
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
    zIndex: 10,
    paddingHorizontal: 25,
    bottom: 20,
    backgroundColor: cor.gray900,
  },
  icon: {
    fontSize: 30,
    color: cor.primaria,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: cor.secundaria,
  },

});

export default StopWatch