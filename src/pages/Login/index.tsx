import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const { realizarLogin, loadingAuth} = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (email === "" || password === "") {
      return alert("Email ou Senha nao Preenchido");
    }

    await realizarLogin({ email, password });
  }

  return (
    <View style={styles.container}>
        <Image
        style={{}}
        source={require("../../assets/logoMarca.png")}
      />
      <Image
        style={styles.logo}
        source={require("../../assets/PortalFooD.png")}
      />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Entrar</Text>
          <Text style={styles.subtitle}>
            Por favor, Faça login para continuar
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Fontisto name="email" size={24} color="#F2223C" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Digite Seu email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={24} color="#F2223C" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Digite Sua Senha"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            {loadingAuth ? (
              <ActivityIndicator size={25} color="#fff"/>
              
              ) : (
                <Text style={styles.buttonText}>Acessar</Text>
              )
            }
            
          </TouchableOpacity>

<<<<<<< HEAD
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <Text style={styles.textLabel}>Nao possui uma conta? Cadastra-se</Text> 
     
     
=======
          <View style={styles.signupContainer}>
            <Text style={styles.textLabel}>Nao possui uma conta?</Text>
            <Text style={styles.textLabelC}> Cadastra-se</Text>
          </View>
        </View>
>>>>>>> 7aad587ef6c7d24e2864bf67f391fa72e6740ad2
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f4",
    borderRadius: 20,
    width: "90%",
    marginTop: 120,
  },
  logo: {
    width: 250,
    height: 35,
    marginBottom: -100,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#828282",
    paddingBottom: 10,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#797979",
  },
  inputContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: "95%",
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderWidth: 2,
    paddingHorizontal: 12,
    borderRadius: 10,

  },
  input: {
    flex: 1,
    height: 50,
    },
  icon: {
    marginRight: 10,
  },
  button: {
    width: "95%",
    height: 50,
    backgroundColor: "#F2223C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 60,
  },
  textLabel: {
    color: "#797979",
    fontWeight: "bold",
    fontSize: 17,
  },
  textLabelC: {
    color: "#F2223C",
    fontWeight: "bold",
    fontSize: 17,
  },
});
