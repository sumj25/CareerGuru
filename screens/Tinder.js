import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Text,
  StyleSheet,TextInput,Alert
} from 'react-native';

import { LogBox } from 'react-native';
import * as SQLite from 'expo-sqlite'

var db = SQLite.openDatabase('UserDatabase.db' );
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SWIPE_LIMIT =SCREEN_WIDTH /2;
class Tinder extends React.Component{
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
      }
    constructor(props){
        super(props);
        this.state={
            index:0,
          }
        const position = new Animated.ValueXY();
        this.panResponder=PanResponder.create({
            onStartShouldSetPanResponder:()=>true,
            onPanResponderMove:(e,gesture)=>{
                position.setValue({x:gesture.dx,y:gesture.dy})
            },
            onPanResponderRelease:(e,gesture)=>{
                if(gesture.dx>SWIPE_LIMIT)
                {this.swiped("right")}
                if(gesture.dx<-SWIPE_LIMIT)
                {this.swiped("left")}
                else{
                     this.resetPosition()
                    }
               
            }
        })
        this.position= position
        this.likeOpacity=position.x.interpolate({
            inputRange:[-SCREEN_WIDTH,0,SCREEN_WIDTH],
            outputRange:[0,0,8],
            extrapole:'clamp'
          })
          this.dislikeOpacity=position.x.interpolate({
            inputRange:[-SCREEN_WIDTH,0,SCREEN_WIDTH],
            outputRange:[5,0,0],
            extrapole:'clamp'
          })
    }
    componentDidUpdate(nextProps) {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();}
    
    swiped(direction){
        const x = direction==='right' ?SCREEN_WIDTH*3: -SCREEN_WIDTH*3
        Animated.timing(this.position,{
            toValue:{x:x,y:0},
           
        }).start(()=>{
          
            const { onSwipeLeft, onSwipeRight, data } = this.props;
          
            const item = data[this.state.index];
            direction === 'right' ? this.renderwer(item): onSwipeLeft(item);
            this.position.setValue({x:0,y:0}),
            this.setState({index:this.state.index+1})
        })
    }
    renderwer=(item)=>{
      const t=item.title
      const tyg=item.type
       const ty=item.company
       const tyr=item.created_at
       const tyge=item.url
       const tygf=item.location
        db.transaction(function(tx){
            tx.executeSql(
                'SELECT * FROM table_user where title = ?',
                [t],
                (tx, results) => {
                  var len = results.rows.length;
                  console.log('len', len);
                  if (len > 0) {
                    Alert.alert('you already liked this job')
                  } else {
                    tx.executeSql(
                        'INSERT INTO table_user (title,job_type,createdat,createdby,uri,location ) VALUES (?,?,?,?,?,?)',
                        [t,tyg,tyr,ty,tyge,tygf],
                        (tx, results) => {
                          console.log('Results', results.rowsAffected);
                          if (results.rowsAffected > 0) {
                               
                            }
                        }
                      )
                  }
                })
           
          });
    }
      
    resetPosition(){
        Animated.spring(this.position,{
            toValue:{x:0,y:0},

        }).start()
    }
    mycardStyle(){
        const rotate = this.position.x.interpolate({
            inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
            outputRange:['-10deg','0deg','10deg'],
            extrapolate:'clamp'
        })
        return{ ...this.position.getLayout(),
              transform:[{rotate:rotate}]
            }
    }
 
   rendercard(){
       if(this.state.index >=this.props.data.length){
           return this.props.renderNoMoreCards()
       }
       return this.props.data.map((item,i)=>{
           if(i<this.state.index){
               return null
           }
           if(i===this.state.index){
               return(
               <Animated.View 
               key={item.id} style={[this.mycardStyle(),styles.cardStyle]}
               {...this.panResponder.panHandlers}>
               <Animated.View style={{opacity:this.likeOpacity,transform:[{rotate:'30deg'}],position:'absolute',top:50,right:45,zIndex:400000,elevation:400000}}>
               <Text style={{borderWidth:1,borderColor:'green',color:'green',fontSize:30,fontWeight:'900',padding:10}}>LIKE</Text></Animated.View>
               <Animated.View style={{opacity:this.dislikeOpacity,transform:[{rotate:'-30deg'}],position:'absolute',top:50,left:25,zIndex:400000,elevation:400000}}>
               <Text style={{borderWidth:1,borderColor:'red',color:'red',fontSize:32,fontWeight:'900',padding:10}}>NOPE</Text></Animated.View>
               {this.props.renderItem(item)}
               </Animated.View>
               )
           }
           return (
               <Animated.View key={item.id} style={styles.cardStyle}>{this.props.renderItem(item)}</Animated.View>)
       }).reverse()
   }
 
   render(){
       return(
           <Animated.View>
         
           {this.rendercard()}
           
        </Animated.View>
       )
   }
}
const styles = StyleSheet.create({
   
    cardStyle:{
        position:"absolute",
        zIndex:1,
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT
        
    }
})
export default Tinder;