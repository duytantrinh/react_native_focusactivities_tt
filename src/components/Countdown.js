import {useEffect,useRef,useState} from 'react'
import {Text,StyleSheet,View} from 'react-native'

import {colors} from '../utils/colors'
import {spacing, fontSizes} from '../utils/sizes'



// minutes = 0.1 ==> default Value = 6s
// if isPaused is passed ==> pause the countdown
// onPress : when press to plus time
// onEnd : something happen when teh countdown is done
export const Countdown = ({minutes = 0.1, isPaused , onPress, onEnd}) => {

  const minutesToMillis = (min) => min * 1000 * 60
const formatTime = (time) => (
  time < 10 ? `0${time}` : time
)

  const interval = useRef(null)

  const [millis, setMillis] = useState(null)
  const [resetMilli, setResetMilli] = useState(null)

  const countDown = () => {
    setMillis((time) => {
      if(time === 0){
        clearInterval(interval.current)
        onEnd()
        setMillis(6000)
        return time
      }

      const timeLeft = time - 1000;
      return timeLeft
    })
  }

  useEffect(() => {
    setMillis(minutesToMillis(minutes))

  }, [minutes])


  useEffect(() => {
    setResetMilli(millis)
  }, [millis])

  useEffect(() => {
    onPress(millis / minutesToMillis(minutes))


  }, [millis])



  useEffect(() => {
    if(isPaused){
      if(interval.current) clearInterval(interval.current)
      return
    }

    interval.current = setInterval(countDown, 1000)

    return () => clearInterval(interval.current)
  }, [isPaused])

  const minute = Math.floor(millis / 1000 / 60 ) % 60
  const seconds = Math.floor(millis / 1000 ) % 60
  

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  )


}

const styles = StyleSheet.create({
  text:{
    fontSize:fontSizes.xxxl,
    fontWeight: 'bold',
    color:colors.white,
    padding: spacing.lg,
    backgroundColor:'lightblue'
  },
})