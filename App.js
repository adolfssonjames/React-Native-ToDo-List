import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard,ScrollView, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TodoTask from './components/TodoTask';
const Stack = createNativeStackNavigator();

// Första Sidan
function Sysslor ({navigation}) {
 
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.title
            ? item.title.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };


  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };


  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  

  //lägg till task
  const handleNewTask = () => {
    if(task.length > 2 ) {
    Keyboard.dismiss(); //tar bort skrivbordet på mobil automatiskt vid task tillägg
    setTaskItems ([...taskItems, task]) //lägger till det som redan finns i taskitem arrayen samt lägger till den nya tasken
    setTask(null); // tömmer textfältet vid task tillägg.
      
    } else {
      alert('3 bokstäver minimum krävs för att sysslan ska läggas till')
    }
  }
// Ta bort task
  const deleteTask = (index) => {
    let copyItems = [...taskItems]; //skapar en ny array från taskitems och storeas i copyItems veriabeln
    copyItems.splice(index, 1); // tar bort den valda itemet och sparar / storear resten av arrayen
    setTaskItems(copyItems);
  }

  
  
  return ( 
 
      <View style={styles.container1}>
          <StatusBar style="auto" backgroundColor="#f7da59"  />
          <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
          <View style={styles.todoTaskContainer}>
            <Text style={styles.title}>
              Sysslor att göra
            </Text>

            <ScrollView style={styles.taskItems}>

              {
                taskItems.map((item, index) => {  //itirerar genom arrayen och visar items i listan.
                return (
                  
                  <TouchableOpacity 
                  onPress={() => navigation.navigate('Påbörjad', {data : <TodoTask  style={styles.todoItem} text={item} /> })}>
                    <TouchableOpacity style={(styles.raderaKnapp)} title="X" key={index} onPress={() => deleteTask(index)}>
                      <Text>Ta Bort</Text>
                    </TouchableOpacity>
                  
                    <TodoTask  style={styles.todoItem} text={item} /> 
                  
                </TouchableOpacity>
                  )
                })
              }
                  

            </ScrollView>
          </View>

          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} //om det är en iphone, ge padding annars om android ge height från keyboard.       //rad 33: varje gång texten ändras, fångar vi texten och settar staten task till att "bli" den texten som skrivits in.
          style={styles.typeTaskSection}>
                                                                                                            
            <TextInput  
            maxLength={35} 
            style={styles.taskInput} 
            placeholder={'Skriv en syssla'} 
            value={task} 
            onChangeText={text => setTask(text)}  
            />     
            
            
            <TouchableOpacity onPress={() =>  handleNewTask() }>
            <View style={styles.addBtn}>
              <Text style={styles.addTask}>Lägg till</Text>
            </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
           
      
      </View>
    )
}
// Andra Sidan
function Påbörjad({navigation, route}) {
  return (
    <View style={styles.taskItems}>
      
      <TouchableOpacity
       onPress={() => navigation.navigate('Färdig', {data : route.params.data})}>{route.params.data}
      </TouchableOpacity>
      <StatusBar style="auto" backgroundColor="#f7da59" />
    </View>
  )
}
// Tredje Sidan
function Färdig({navigation, route}) {

  return (
    <View style={styles.container}>
      <TouchableOpacity >

      {route.params.data}
      </TouchableOpacity>
      <StatusBar style="auto" backgroundColor="#f7da59" />
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Att göra" component={Sysslor} />
        <Stack.Screen name="Påbörjad" component={Påbörjad} />
        <Stack.Screen name="Färdig" component={Färdig} />
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
    flex: 1,
  },
  todoTaskContainer: {
    maxHeight:450,
    paddingHorizontal:15,
    paddingTop:0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal:0,
  },


  addBtn: {
    width:60,
    height: 60,
    backgroundColor: '#9aff91',
    borderRadius:15,
    borderColor:'#19fa05',
    borderWidth:1.2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  taskInput: {
    borderRadius:10,
    borderColor:'#19fa05',
    borderWidth:1.2,
    paddingHorizontal:30,
    paddingVertical:10,
    width:200,
    backgroundColor: '#9aff91',
    fontSize: 17,
  },

  typeTaskSection: {
    position: 'absolute',
    bottom: 30,
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems:'center',
  },

  raderaKnapp:{
    width:50,
    height:20,
    backgroundColor: '#f01114',
    borderRadius:5,
    alignItems: 'center'
    
  }, 
  filterTask:{
    borderRadius:10,
    borderColor:'#19fa05',
    borderWidth:1.2,
    paddingHorizontal:20,
    paddingVertical:10,
    width:150,
    backgroundColor: '#fff',
    fontSize: 17,
    flex:3,
    marginVertical: 10,
  }




});
