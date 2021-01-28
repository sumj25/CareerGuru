import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ActivityIndicator, TouchableOpacity,Animated
} from 'react-native';
import _ from 'lodash'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, icon, Card } from 'react-native-elements'
import Tinder from '../screens/Tinder';
import * as SQLite from 'expo-sqlite'
import { Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT=Dimensions.get('window').height;
const db = SQLite.openDatabase('UserDatabase.db')
export default class Api extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      data: [],
      fullData: [],
      query: [],
      ekaurdata:[]
    }
    db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR(200),job_type VARCHAR(200),createdat VARCHAR(200),createdby VARCHAR(200),uri VARCHAR(200),location VARCHAR(200))',
      )
         
   })
}
  componentDidMount() {
    this.api()
  }
  api() {
    fetch('https://jobs.github.com/positions.json?')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          data: responseJson,
          fullData: responseJson,
          ekaurdata:responseJson
        })

      })
}
renderItem(item) {
    return (
    
      <Animated.View style={{marginRight:18,}}>
        <Card key={item.id}>
        <Card.Title style={{fontSize:20}}>{item.title}</Card.Title>
         <View style={{ height: 350 }} >
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android' ? true : false}
          >
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text style={{lineHeight:15}}>Posted By: {item.company}</Text>
          <Text style={{lineHeight:15}}>Posted At: {item.created_at}</Text>
        </View>
        <Text style={{lineHeight:15}}>
          Location: {item.location}
        </Text>
        <Text style={{lineHeight:15}}>
          Type: {item.type}
        </Text>
        <Text style={{lineHeight:15}}>
          Type: {item.title}
        </Text>
        <Text style={{lineHeight:15}}>
          Visit the company at: {item.company_url}
        </Text>
      </Card>
      </Animated.View>
   
    )
  }
  renderNoMoreCards() {
    return (
      <View>
        <Text>sorry,no more job around here</Text></View>)
  }
  renderFooter = () => {
    if (!this.state.isLoading) return null
    return (
      <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
        <ActivityIndicator animating size="large" /></View>
    )
  }
  handleSearch = (text) => {
    this.setState({ query: text, data: this.state.fullData })
  }
  onPress = () => {
    const reqdata = _.filter(this.state.fullData, need => {
      if (need.title.includes(this.state.query)) {
        return true
      }
      return false
    })
    this.setState({ data: reqdata })
  }

  render() {
    let { container } = styles
    let { data, isLoading } = this.state
    if (isLoading) {
      return (
        <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
          <ActivityIndicator />
        </View>
      )
    }
    else {
        
     
      return (
        <View style={container}>
          <Tinder
            data={data}
            renderItem={this.renderItem}
            renderNoMoreCards={this.renderNoMoreCards}
            keyExtractor={(item, index) => index.toString()}  
          
           />
        

        </View>
      )
    }

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
    marginRight:150,
    alignContent:'center',
   
    
    
    
  },
  item: {
    padding: 5,
    borderWidth: 1,
    borderBottomColor: '#eee'
  }
});
