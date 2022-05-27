import React from "react";
import { View, Text, StyleSheet,  } from 'react-native';


const TodoTask = (input) => {
    return (

        <View style={styles.TaskItem}>
            <View style={styles.Tasken}>
            
                <Text style={styles.taskText}>{input.text}  </Text>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
  
   
    taskText: {
     
        fontSize: 17,
        paddingLeft: 8,
        textAlign:"center",
        flex:1,
    },
    Tasken: {
        flexDirection: "row",
        flexWrap:'wrap',
        alignItems: 'center',
    },
    TaskItem: {
        padding: 18,
        borderRadius:8,
        margin: 12,
        backgroundColor: '#f7da59',
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    handler: {
        fontSize: 18,
    }
});
export default TodoTask;