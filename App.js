import { StatusBar } from 'expo-status-bar';
import 'expo-asset';
import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import Login from './src/components/Login';
import TaskList from './src/components/TaskList'
import firebase from './src/services/firebaseConnection'
import Feather from 'react-native-vector-icons/Feather'


export default function App() {

  const [user, setUser] = useState(null)
  const inputRef = useRef(null)
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [key, setKey] = useState('')


  useEffect(() => {

    function getUser(){
      
      if(!user){
        return;
      }

      firebase.database().ref('tarefas').child(user).once('value', (snapshot) => {
        setTasks([]);

        snapshot?.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome
          }

          setTasks(oldTasks => [...oldTasks, data])})

      })

    }

    getUser();

  }, [user])


  function handleAdd(){
    if(newTask === ''){
      return;
    }

    if(key !== ''){
      
      firebase.database().ref('tarefas').child(user).child(key).update({
        nome: newTask,
      })
      .then(() => {
        const taskIndex = tasks.findIndex(item => item.key === key)
        const taskClone = tasks;
        taskClone[taskIndex].nome = newTask
        setTasks([...taskClone])
        alert('Tarefa Atualizada')
      });

      Keyboard.dismiss();
      setNewTask('');
      setKey('');
      return;

    }

    let tarefas = firebase.database().ref('tarefas').child(user);
    let chave = tarefas.push().key;

    tarefas.child(chave).set({
      nome: newTask
    })
    .then(() => {
      const data = {
        key: chave,
        nome: newTask
      };
      setTasks(oldTasks => [...oldTasks, data]
      )  
      alert('tarefa criada')

    })
    .catch(() => {
      alert('Houve algum problema na criação da tarefa')
    })

    Keyboard.dismiss();
    setNewTask('')
    

  }

  function handleDelete(key) {
    
    firebase.database().ref('tarefas').child(user).child(key).remove()
    .then(() => {
      const findTasks = tasks.filter(item => item.key !== key)
      setTasks(findTasks)
    })

  }

  function handleEdit(data){
    setKey(data.key)
    setNewTask(data.nome)
    inputRef.current.focus();
    
  }

  function cancelEdit(){
    setKey('')
    setNewTask('')
    Keyboard.dismiss();
  }

  if(!user){
    return <Login changeStatus= {(user) => setUser(user)}/>
  }

  return (
    <SafeAreaView style={styles.container}>
      
      {
        key.length > 0 &&
        <View style={{flexDirection: 'row', marginBottom: 10}}>
        <TouchableOpacity onPress={cancelEdit}>
          <Feather name='x-circle' size={25} color='#FF0000'/>
        </TouchableOpacity>
        <Text style={{marginLeft: 5, color:'#ff0000'}}>Você está editando uma tarefa!</Text>
      </View>


      }

      <View style={styles.containerTask} >

      <TextInput
        style={styles.input}
        placeholder="O que ira fazer hoje?"
        value={newTask}
        onChangeText = { (text) => setNewTask(text) }
        ref={inputRef}
      />
      <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      </View>
      <FlatList style={styles.lista}
      data={tasks}
      keyExtractor={item => item.key}
      renderItem={({item}) => (<TaskList data={item} deleteItem={handleDelete} editItem={handleEdit}/>)}
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
    paddingTop: 25,
    paddingHorizontal: 10,
  },
  containerTask: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    height: 45,
    color: '#222',
  },
  buttonAdd: {
    backgroundColor: '#151515',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f9f9f9',
    color: '#f9f9f9',
    marginLeft: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#f9f9f9',
    fontSize: 25,
  },
  lista: {
    color: '#f9f9f9',
    fontSize: 15
  }
});
