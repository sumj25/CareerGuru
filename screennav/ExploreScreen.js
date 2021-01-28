import React, { useState, useEffect } from 'react';
import {   Button,StyleSheet, Text, View,FlatList,SafeAreaView ,Alert,Linking} from 'react-native';
import * as SQLite from 'expo-sqlite'
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { icon, Card } from 'react-native-elements'
var db = SQLite.openDatabase( 'UserDatabase.db' );
const ExploreScreen= () => {
  let [flatListItems, setFlatListItems] = useState([]);
  let [inputUserId, setInputUserId] = useState('');
function fun () {
  db.transaction((tx) => {
   tx.executeSql(
      'SELECT * FROM table_user',
      [],
      (tx, results) => {
       var temp=[]
        for (let i = 0; i < results.rows.length; ++i)
         { temp.push(results.rows.item(i));}
         setFlatListItems(temp);
        
      }
    );
  });
 
};

let listViewItemSeparator = () => {
  return (
    <View
      style={{
        height: 0.2,
        width: '100%',
        backgroundColor: '#808080'
      }}
    />
  );
};
let onPress=(x)=>{
    console.log('d')
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [x],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('hyu')
          
          }
        }
      );
    });
  };

let listItemView = (item) => {
  var myJSON = JSON.stringify(item.company_url);
  return (
    <Card key={item.user_id} title={item.title} style={{ height: 500 }}>
        <View style={{ height: 300 }} >
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android' ? true : false}
          >
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>Posted By: {item.createdby}</Text>
          <Text>Posted At: {item.createdat}</Text>
        </View>
        <Text>
          Location: {item.location}

        </Text>
        <Text>
          Type: {item.job_type}
        </Text>
        <Text>
         Title: {item.title}
        </Text>
        <Text>
          Visit the company at: {item.uri}
        </Text>
        <View style={styles.container}>
     <View style={styles.buttonContainer}>
        <Button 
        title="Apply"
         backgroundColor="#03A9FA"
         onPress={()=>Linking.openURL(item.uri)}
         />
         </View>
         <View style={styles.buttonContainer}>
        <Button title="Delete"
        color={'#F44336'}
         backgroundColor="#f08e25"
         onPress={()=>onPress(item.user_id)}/>
         </View>
  </View>
      </Card>
  );
};

return (
   
    <View style={{ flex: 1, backgroundColor: 'white' }}>
    {fun()}
      <View style={{ flex: 1 }}>
       <FlatList
          data={flatListItems}
          ItemSeparatorComponent={listViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => listItemView(item)}
        />
        
      </View>
     
    </View>
    
 
);
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      paddingTop: 50
    },
    item: {
      padding: 5,
      borderWidth: 1,
      borderBottomColor: '#eee'
    },
    
      container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonContainer: {
        flex: 1,
        marginHorizontal:10
      }
  
  });
export default ExploreScreen;