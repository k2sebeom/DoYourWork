import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import CalendarSection from "./components/CalendarSection";
import Header from "./components/Header";
import Nav from "./components/Nav";
import TodoSection from "./components/TodoSection";
import WorkoutSection from "./components/WorkoutSection";


const App = () => {
  const [phase, setPhase] = useState<number>(0);
  const [d, setD] = useState<string>((new Date()).toDateString());

  return (
    <SafeAreaView style={styles.background}>
      <Header phase={phase} setPhase={setPhase} />
      {
        phase < 2 ? <Nav today={d} setToday={setD} /> : null
      }
      <ScrollView style={styles.main}>
        {{
          0: <TodoSection d={d} />,
          1: <WorkoutSection />,
          2: <CalendarSection />
        }[phase]}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#111111',
    flex: 1
  },
  main: {
    backgroundColor: '#111111',
  }
});

export default App;
