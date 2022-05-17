import react from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const TodoTask = (input) => {
    return (

        <View style={styles.TaskItem}>
            <View style={styles.Tasken}>
                <TouchableOpacity style={styles.addKnapp}>

                </TouchableOpacity>
                <Text style={styles.taskText}>{input.text}  </Text>
            </View>
            <View style={styles.delKnapp}>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    delKnapp: {
        borderColor:'#333',
        borderWidth:2,
        borderRadius:5,
        height:12,
        width: 12,

    },
    addKnapp: {
      width:24,
      height:24,
      backgroundColor: '#222',
    },
    taskText: {
        maxWidth:'80%',
        fontSize: 17,
        paddingLeft: 8,
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
});
export default TodoTask;