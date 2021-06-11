
import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image} from 'react-native';
import {Header} from 'react-native-elements'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import db from './localDB'
import PhonicSoundButton from './Components/PhonicSoundButton'

export default class App extends React.Component {
  constructor(){
    super()
    this.state={
      text:'',
     chunks:[],
     phonicSound:[],
     i:0
    }
    //map function is used to access elemnts from array. It works like for loop and can return jsx tags.
    console.log(db['woman'].chunks)
  }
  render(){
    return (
      
      <SafeAreaProvider style={styles.container}>
       <Header backgroundColor={'blue'} 
        centerComponent={{
        text:'Monkey Chunky App',
        style:{color:'yellow',fontSize:20}
        }} ></Header>
        <Image source={
            require('./monkey.jpg')

        } style={{width:200,height:200,marginTop:100}}/>
        <TextInput style={styles.inputBox}
        onChangeText={text=>{
          this.setState({
            text:text
          })
        }} value={this.state.text}/>
        <TouchableOpacity style={styles.go} onPress={()=>{
         // console.log(db[this.state.text])
         var word=this.state.text.toLowerCase().trim()
         db[word]?(
          this.setState({
            chunks:db[word].chunks,
            phonicSound:db[word].phones,
            i:0
          })):alert ("The word does not exist")

        }}><Text style={{textAlign:'center',fontSize:25,padding:10,fontWeight:'bold'}}> GO</Text></TouchableOpacity>
        <View>
          
          {this.state.chunks.map((item,index,i)=>{
           return (
           <PhonicSoundButton 
            wordChunk={this.state.chunks[index]}
            soundChunk={this.state.phonicSound[index]}
            buttonIndex={i}
            />
           )
           
          })}
        </View>
    
      </SafeAreaProvider>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:1000,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox:{
    marginTop:100,
    width:200,
    alignSelf:'center',
    textAlign:'center',
    borderWidth:3
  },
  go:{
     width:100,
     borderRadius:20,
     height:50,
     margin:10,
     backgroundColor:'orange',
     alignSelf:'center',
     
  },

});
