import {useState} from 'react'
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import {colors} from './src/utils/colors.js'
import {Focus} from './src/features/Focus'
import {Timer} from './src/features/Timer'
import {FocusHistory} from './src/features/FocusHistory'


export default function App() {
  const [addSubject, setAddSubject] = useState('')
  const [history, setHistory] = useState([])

  return (
    <SafeAreaView style={styles.container}>
    {
     !addSubject ? 
     (
       <>
        <Focus addSubject={(val) => setAddSubject(val)}/>
        <FocusHistory history={history}/>
     </>
     ) : (
       <Timer 
        focusSubject={addSubject}
        onTimeEnd={(subject)=>{
          setHistory([...history,subject])
        }}
        clearSubject={()=>{setAddSubject(null)}}
        />
     )
    }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:colors.darkBlue
  }
});
