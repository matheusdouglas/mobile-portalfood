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


import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {

 const { realizarLogin } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(){
    if(email === '' || password === '') {
        return alert('Email ou Senha nao Preenchido')
    }
  
    await realizarLogin({ email,password })
  

  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/PortalFooD.png")}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite Seu email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite Sua Senha"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <Text style={styles.textLabel}>Nao possui uma conta? Cadastra-se</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 250,
    height: 35,
    marginBottom: 30,
  },
  inputContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "95%",
    height: 40,
    borderColor: "#d2d2d2",
    borderWidth: 2,
    marginTop: 22,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  button: {
    width: "95%",
    height: 40,
    backgroundColor: "#F2223C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  textLabel: {
    marginTop:30,
    color: '#FFA42D',
    fontWeight: 'bold',
    fontSize: 17
  }
});
