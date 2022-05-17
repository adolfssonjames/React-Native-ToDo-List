import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TodoTask from './components/TodoTask';
export default function App() {
  return (
    
    <View style={styles.container}>
        <StatusBar backgroundColor="#f7da59"  />
        <View style={styles.todoTaskContainer}>
          <Text style={styles.title}>
            Sysslor att göra
          </Text>

          <View style={styles.taskItems}>
            <TodoTask text={'task'}/>
            <TodoTask text={'task'}/>
          </View>
          
        </View>

    </View>
  );
}



/* CSS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  todoTaskContainer: {
    paddingHorizontal:15,
    paddingTop:70,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal:110,

  },
  taskItems: {

  },
});
