import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

// Första Sidan
function PunList ({navigation}) {

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [mainDataSource, setMainDataSource] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMainDataSource(responseJson);
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    
    if (text) {
      // om den inte är tom
      // Filtrera mainDataSource och uppdatera filteredDataSource
      const newData = mainDataSource.filter(
        function (item) {
          const itemData = item.title
            ? item.title.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    }  
    else {
      // Updaterar FilteredDataSource med mainDataSource
      setFilteredDataSource(mainDataSource);
      setSearch(text);
    }
  };

  // FlatList Item klick navigering funktion
  const ItemView = ({item,}) => {
    
    return (
      <View  > 
      <Text
        style={styles.punListStyle}
        onPress={() => navigation.navigate('Learn', {data : getItem(item) })}>
        {item.id}
        {".  "}  
        {item.title.toUpperCase()}
      </Text>
      </View>   
    );
  };

  // delar upp listans items 
  const ItemSeparatorView = () => {
    return (
      <View 
      
        style={{
          height: 1.5,
          width: '100%',
          backgroundColor: '#f5e23d',
        }}
      />
    );
  };

  //klicka på ett item  
  const getItem = (item) => {
    return (
      <View >
        <Text style={styles.chosenPunStyle}>
        { ' Chosen Pun | ' + item.id + '. ' + item.title}
        </Text>
      </View>
  
    );
  
  };


  return ( 
    <View style={styles.container1}>
        <StatusBar style="auto" backgroundColor="#f7da59"  />
        <View style={styles.todoTaskContainer}>
            <Text style={styles.title}>
              Roliga PUNS att lära sig
            </Text>
            <TextInput
             style={styles.textInputStyle}
             onChangeText={(text) => searchFilterFunction(text) }
             value={search}
             placeholder="Search Pun"
             />
            <FlatList
              style={styles.punListStyle}
              data={filteredDataSource}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
             />
        </View>

      
    </View>
    );
};
// Andra Sidan
function Learn ({navigation, route}) {

  return (
    <View style={styles.punListStyle}>
      <StatusBar style="auto" backgroundColor="#f7da59" />
      <TouchableOpacity
         onPress={() => navigation.navigate('Learned', {data : route.params.data})}>{route.params.data}
      </TouchableOpacity>
    
    </View>
  )
}
// Tredje Sidan
function Learned({navigation, route}) {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="#f7da59" />
      <TouchableOpacity 
       onPress={() => navigation.navigate('Mastered', {data : route.params.data})}>{route.params.data}
      </TouchableOpacity>
      
    </View>
  )
}
//Fjärde sidan
function Mastered({navigation, route}) {
  
  const onRemove = id => title => {
    setMainDataSource(title.filter(title => title.id !== id));
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="#f7da59" />
      {route.params.data}
      <Button color="#ff2121" title="delete" onPress={() => navigation.navigate('PunList',  onRemove())} />
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PunList" component={PunList} />
        <Stack.Screen name="Learn" component={Learn} />
        <Stack.Screen name="Learned" component={Learned} />
        <Stack.Screen name="Mastered" component={Mastered} />
      </Stack.Navigator>
    </NavigationContainer>
  )  
  }

          
/* CSS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  container1: {
    paddingLeft:40,
    paddingRight:40,
  },

  title: {
  fontSize:25, 
  fontWeight:"bold",
  alignSelf:'center',
  },

  textInputStyle: {
   borderRadius: 50,
  paddingLeft:22,
    fontSize:30,
    backgroundColor:"#a5faa5",
    color:"#000300",
  },

  punListStyle: {
    fontSize:20,
    paddingTop:5,
  },

  chosenPunStyle: {
    color:"#45ad18",
    fontSize:22,
    fontWeight:"bold",
  },

});
