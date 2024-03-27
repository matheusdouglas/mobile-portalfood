import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  LogBox,
} from "react-native";

import { api } from "../../services/api";

export default function Cadastro() {

    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    async function cadastrarUsuario (){

      const response = await api.post('/users', {
      name : name,
      email : email,
      password: password
     })

       alert(response)
    }
  

  return(

    <View style={styles.container}>

        <StatusBar hidden/>

        <Image
        style={styles.logo}
        source={require("../../assets/PortalFooD.png")}
      />

        <View style={styles.inputsConteiner}>
          <TextInput value={name} placeholder="Digite seu nome:" style={styles.textInput} onChangeText={setName}/>
          <TextInput value={email} placeholder="Digite seu email:" style={styles.textInput} onChangeText={setEmail}/>
          <TextInput value={password} placeholder="Digite sua senha:" style={styles.textInput} onChangeText={setPassword}/>
          
          <TouchableOpacity style={styles.buttonCadastro} onPress={cadastrarUsuario}>
            <Text style={styles.textAcessar}>Cadastrar</Text>
          </TouchableOpacity>


        //navigation para voltar para tela de login
          <Text style={styles.textLabel}>Ja possuo uma conta </Text> 

          

        </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo:{
    width: 250,
    height: 35,
    marginBottom: 30,
  },
  inputsConteiner:{
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput:{
    width: "95%",
    height: 40,
    borderColor: "#d2d2d2",
    borderWidth: 2,
    marginTop: 22,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonCadastro:{
    width: "95%",
    height: 40,
    backgroundColor: "#F2223C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 10,
  },
  textAcessar:{
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  textLabel:{
    marginTop:30,
    color: '#FFA42D',
    fontWeight: 'bold',
    fontSize: 17
  }
});
