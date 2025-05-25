import React, {useState,useEffect} from 'react'
import {View,Text,StyleSheet,Vibration} from 'react-native'
import {Countdown} from '../components/Countdown'
import {RoundedButton} from '../components/RoundedButton'
import {spacing} from '../utils/sizes'
import {colors} from '../utils/colors'
import { ProgressBar, MD3Colors } from 'react-native-paper';
import {Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

 // creating Vibration when timer is done
  const ONE_SECOND_IN_MS = 1000;
  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
  ];

export const Timer = ({focusSubject,clearSubject,onTimeEnd}) => {
  // keep the phone awake - DON'T sleep during the time , timer is running
  useKeepAwake()

  const [isStarted, setIsStarted] = useState(false)
  const [progress, setProgress] = useState(1)
  const [minutes, setMinutes] = useState(0.1)

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    onTimeEnd(focusSubject)
  }
  


  return (
    <View style={styles.container}>
      <View style={styles.countdown}>

        <Countdown 
          minutes={minutes}
          onPress={setProgress} 
          onEnd={onEnd} 
          isPaused={!isStarted}
        />

        <View style={{paddingTop:spacing.xxl}}>
          <Text style={styles.title}>Focusing on: </Text> 
          <Text style={styles.task}>{focusSubject}</Text> 
        </View>

      </View>

      <View style={{paddingTop:spacing.sm}}>
        <ProgressBar progress={progress.toFixed(1)} color={colors.progressBar} style={{height: spacing.sm}} />
      </View>

      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>

      <View style={styles.buttonWrapper}>
        {!isStarted ? 
          (
            <RoundedButton title="start" onPress={() => setIsStarted(true)} />)
          :
          (
            <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
          )
        }
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton size={50} title="-" onPress={clearSubject}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,

  },
  countdown:{
    flex:0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
 timingWrapper:{
    flex:0.1,
    flexDirection:'row',
    paddingTop:spacing.xxl,
   
  },
  buttonWrapper:{
    flex:0.3,
    flexDirection:'row',
    padding:spacing.md,
    justifyContent: 'center',
    alignItems: 'center',  
  },
  title:{
    color:colors.white,
    fontWeight:'bold',
    textAlign:'center'
  },
  task:{
    color:colors.white,
    textAlign:'center'
  },
clearSubject:{
      justifyContent: 'center',
    alignItems: 'center',  
}

})