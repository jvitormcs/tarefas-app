import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import firebase from '../../services/firebaseConnection';
import Feather from 'react-native-vector-icons/Feather';


export default function Login({changeStatus}) {

    const [type, setType] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hidePass, setHidePass] = useState(true)
    
    function handleLogin(){
        if(type === 'login'){
            const user = firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                changeStatus(user.user.uid)
            })
            .catch((err) => {
                console.log(err)
                alert('Houve algum erro');
                return;})
            
        }else{
            const user = firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                changeStatus(user.user.uid)
            })
            .catch((err) => {
                console.log(err)
                alert('Houve algum erro no cadastro');
                return;})
            
        }
    }

    function PassHide(){

        if(hidePass == true){
            return setHidePass(false)
        } else if ( hidePass == false ){
            return setHidePass(true)
        }

    }

  return (
    <SafeAreaView style={styles.container}>
        
    <TextInput placeholder='Seu email' placeholderTextColor={'#151515'} value={email} style ={styles.input} onChangeText={(text) => {setEmail(text)}}/>

    <View style={styles.inputArea}>

    <TextInput placeholder='Sua senha' placeholderTextColor={'#151515'} value={password} style ={styles.input} onChangeText={(text) => {setPassword(text)}} secureTextEntry={hidePass}/>


    <TouchableOpacity style={styles.icon} onPress = {PassHide} >
    {
        hidePass ? 
        <Feather name='eye' color={'#222'} size={25}/>
        :
        <Feather name='eye-off' color={'#222'} size={25}/>

    }

    </TouchableOpacity>
    </View>


    <TouchableOpacity style={styles.handleLogin} onPress={handleLogin}>
        <Text style={styles.handleLoginText}>
            {type === 'login' ? 'Acessar' : 'Cadastrar'}
        </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.handleLogin} onPress={() => {setType(type => type === 'login' ? 'cadastrar' : 'login')} }>
        <Text style={styles.handleLoginText}>{type === 'login' ? 'Registrar' : 'Já possuo uma conta' }</Text>
    </TouchableOpacity>


    <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#151515',
      alignItems: 'center',
      justifyContent: 'center',
    },
    texto: {
        fontSize: 20,
        color: '#f9f9f9'
    },
    input: {
        width: '80%',
        height: 45,
        backgroundColor: '#f9f9f9',
        fontSize: 20,
        color: '#151515',
        padding: 10,
        borderRadius: 10,
    },
    handleLogin: {
        borderWidth: 2,
        borderColor: '#f9f9f9',
        alignItems:'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 15,
        marginBottom: 15,
        width: '50%'
    },
    handleLoginText: {
        fontSize: 18,
        color: '#f9f9f9',
    },
    inputArea: {
        flexDirection: 'row',
        width: '80%',
        height: 45,
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        fontSize: 20,
        color: '#151515',
        borderRadius: 10,
        marginVertical: 15,
    },
    icon: {
        width: '20%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }

})