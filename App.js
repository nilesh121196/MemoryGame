/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';


var total_turn = 0
var total_match = 0
var charactArr = ['A','B','C','D','E','F','G','H']
var PowerSet = splitArrayIntoChunksOfLen([...charactArr,...charactArr].sort(()=>0.5-Math.random(0,1)).map((d,i)=>{
  return {
    'value':d,
    'position':i,
    'display':false,
    'clicked':false
  }
}), 4)
var match_array = []

function splitArrayIntoChunksOfLen(arr, len) {
  var chunks = [], i = 0, n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }
  return chunks;
}


const GridRow = (d, props) =>{
  let t = []
  d.map((e)=>{
      t.push(
      <View key={e.position} style={styles.row}>
        <TouchableOpacity style={[styles.itemS, (e.clicked ? {backgroundColor: 'grey'}:{} )]} disabled={e.display || e.clicked || match_array.length == 2} key={e.position}  onPress={()=>{clickOnGridBox(e, props)}} >
          {
            (e.display && !e.clicked) ?   <Text  style={styles.textStyle}>{e.value}</Text> : null
          }
        </TouchableOpacity>
      </View>)
  })
  return t
}

function clickOnGridBox(e,props){
  e.display = true
  match_array.push(e)

  if(match_array.length == 2){
    total_turn = total_turn + 1

    if(match_array[0].value == match_array[1].value){
      total_match = total_match + 1
      setTimeout(()=>{
        match_array.map(d=>{
          d.clicked = true
          d.display = false
        })
        match_array = [] 
        
        props.changeDS(!props.ds)

      },2000)
      props.changeDS(new Date())
    }else{

      setTimeout(()=>{
        match_array.map(d=>{
          d.display = false
        })
        match_array = [] 
        props.changeDS(new Date())
      },1000)
   
    }
  }
  props.changeDS(new Date())
}


const GridColumn = (props) =>{
  let t = []
  PowerSet.map((d,i)=>{
    t.push(<View key={i} style={styles.columns}>
      {GridRow(d, props)}
    </View>)
  })
  return t
}




const App = () => {
  const [ds,changeDS] = useState(new Date())
  return (
    <SafeAreaView style={{flex:1}}>
          <StatusBar />
    
          <View style={{ flex:1 }} >
              {
                GridColumn({ds, changeDS})
              }

              <View style={{flex:1, flexDirection:'row'}}>
                    
                    <View style={{flex:1, padding:30}}>
                        <Text style={styles.textStyleHead}>Total Turns: {total_turn}</Text>
                    </View>

                    <View style={{flex:1, padding:30}}>
                        <Text style={styles.textStyleHead}>Total Match: {total_match}</Text>
                    </View>
              
            </View>

          </View>
         
    </SafeAreaView>
  );
};

 

const styles = StyleSheet.create({
  columns:{
    flex: 1,
    flexDirection:'row'
  },
  row:{
    margin:5,
    flex:1,
    alignSelf:'center'
  },

  itemS:{
    margin:5,
    padding:'20%',
    backgroundColor:'white',
    alignSelf: "center",
    elevation:5,
    alignItems: 'center',
    
    height: 100,
    shadowColor: 'black',
    width: 100,
    
    shadowOffset: {
      width: 25,
      height:25
    },
    shadowOpacity: 0.8,
    shadowRadius: 10
  },
  textStyle: {
    fontSize:50
  },
  textStyleHead:{
    fontSize: 30
  }
});

export default App;
