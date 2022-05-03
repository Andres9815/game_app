import React, {useEffect, useState, useRef} from "react";
import { Button, StyleSheet, Text, View } from "react-native"
import Number from "./Number";
import RNRestart from 'react-native-restart';


export default Game = ({ randomNumbersCount, initialSeconds }) => {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [ target, setTarget ] = useState(999);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [ gameStatus, setGameStatus] = useState('PLAYING');

  let intervalId = useRef();

  useEffect (() => console.log(selectedNumbers), selectedNumbers);

  //const target = 10 + Math.floor(40 * Math.random());

  //const numbers = Array.from({ length: randomNumbers}).map(() => 1+Math.floor(10 * Math.random()));
  //const target = numbers.slice(0, randomNumbers -2). reduce((acc,cur) => acc + cur, 0);
  // No array -> execute at all time.

  useEffect(() => {
    const numbers = Array.from({ length: randomNumbersCount}).map(() => 1+Math.floor(10 * Math.random()));
    const target = numbers.slice(0, randomNumbersCount -2).reduce((acc,cur) => acc + cur, 0);
    setRandomNumbers(numbers);
    setTarget(target);

   intervalId.current = setInterval(() => setRemainingSeconds(seconds => seconds -1 ) , 1000);
   return () => clearInterval(intervalId.current);
  },[]);

  // useEffect(() => {
  //   if (remainingSeconds ===0){
  //     clearInterval(intervalId.current);
  //   }
  // }, [remainingSeconds]);

  useEffect(() => {
    setGameStatus(() => getGameStatus());
    if (remainingSeconds === 0 || gameStatus !== 'PLAYING'){
      clearInterval(intervalId.current);
    }
  }, [remainingSeconds, selectedNumbers]);

  const isNumberSelected = numberIndex => selectedNumbers.some(number => number === numberIndex);
  const selectedNumber = number => {
    setSelectedNumbers([...selectedNumbers, number]);
  };
  const getGameStatus = () =>{
    const sumSelected = selectedNumbers.reduce((acc,cur) => acc + randomNumbers[cur], 0);
    if (remainingSeconds ===0 || sumSelected > target){
      return 'LOST';
    } else if (sumSelected === target) {
      return 'WON';
    } else {
      return 'PLAYING';
    }
  };
  //const status = gameStatus(); 

  return(
    <View>
      <Text style={styles.target}>{target}</Text>
      <Text style={[styles.target, styles[gameStatus]]}>{gameStatus}</Text>
      <Text>{remainingSeconds}</Text>
      <View style={styles.randomContainer}>
         {randomNumbers.map((number, index)=>(
           <Number 
           key={index} 
           id={index} 
           number={number} 
           isSelected={isNumberSelected(index) || gameStatus !=='PLAYING'}
           onSelected={selectedNumber}
           />
      

      ))}
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  target:{
    fontSize: 40,
    backgroundColor: '#aaa',
    textAlign:'center',
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent: 'space-between'

  },
  PLaying: {
    backgroundColor: '#bbb'
  },
  LOST: {
    backgroundColor: 'red'
  },
  WON: {
    backgroundColor: 'green'
  }
  
})