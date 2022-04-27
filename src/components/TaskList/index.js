import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'

function TaskList({data,  deleteItem, editItem}){
    const {key, nome} = data;
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.icone} onPress={() => {deleteItem(key)}}>
                <Feather name='trash' color={'#222'} size={20}/>
            </TouchableOpacity>
            <View>
                <TouchableWithoutFeedback onPress={() => {editItem(data)}}>
                    
                    <Text style={styles.listaTexto}>{`${nome}`}</Text>

                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
   container: {
       flex: 1,
       flexDirection: 'row',
       backgroundColor: '#f9f9f9',
       alignItems: 'center',
       marginBottom: 10,
       padding: 10,
       borderRadius: 4,
   },
   listaTexto: {
       color: '#222',
       paddingRight: 10,
   },
   icone:{
       marginRight: 10,
   }
})

export default TaskList;