import { View, StyleSheet, Text } from "react-native"
import { cor, font } from "../../../../utils/presetStyles";
import { useEffect, useRef, useState } from "react";
import Stopwatch from "react-native-vector-icons/Fontisto"
import Stop from "react-native-vector-icons/Entypo"
import Pause from "react-native-vector-icons/Foundation"
import Play from "react-native-vector-icons/FontAwesome5"

const StopWatch = () => {
  const [time, setTime] = useState(0); //seconds
  const [isRunning, setIsRunning] = useState(false);
  const [stopWatchStarted, setStopWatchStarted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

    } else if (!isRunning && timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { timerRef.current && clearInterval(timerRef.current); }
  }, [isRunning]);

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleStopWatch = () => {
    if (stopWatchStarted) {
      setTime(0);
      setIsRunning(false);
      clearInterval(timerRef.current);
      setStopWatchStarted(false);
    } else {
      setIsRunning(true);
      setStopWatchStarted(true);
    }
  };

  return (
    <>
      {stopWatchStarted ?
        < >
          <View style={styles.divAbsoluteLeft}>
            {isRunning ?
              <Pause name="pause" style={{ ...styles.icon, paddingHorizontal: 18, }} onPress={handleStartPause} />
              :
              <Play name="play" style={{ ...styles.icon, paddingLeft: 16, paddingRight: 12, paddingVertical: 12, fontSize: 25 }} onPress={handleStartPause} />
            }
          </View>
          <View style={{ ...styles.viewCronText, ...styles.divAbsoluteCenter }}>
            <Text style={{ ...styles.cronText }}>{formatTime(time)}</Text>
          </View>
          <View style={styles.divAbsoluteRight}>
            <Stop name="controller-stop" style={{ ...styles.icon, paddingHorizontal: 10, backgroundColor: cor.erro }} onPress={handleStopWatch} />
          </View>
        </>
        :
        <View style={{ ...styles.divAbsoluteRight}}>
          <Stopwatch name="stopwatch" style={{ ...styles.icon }} onPress={handleStopWatch} />
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  divAbsoluteCenter: {
    //"flex flex-col bg-gray-700 rounded-2xl px-7 py-4 gap-3"
    position: "absolute",
    zIndex: 10,
    bottom: 20,
  },
  divAbsoluteLeft: {
    //"flex flex-col bg-gray-700 rounded-2xl px-7 py-4 gap-3"
    position: "absolute",
    left: 25,
    zIndex: 10,
    bottom: 20,
  },
  divAbsoluteRight: {
    //"flex flex-col bg-gray-700 rounded-2xl px-7 py-4 gap-3"
    position: "absolute",
    right: 25,
    zIndex: 10,
    bottom: 20,
  },
  viewCronText: {
    alignSelf: "center",
    backgroundColor: cor.gray900,
    borderRadius: 7,
    borderColor: "white",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cronText: {
    color: "white",
    fontSize: 17,
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