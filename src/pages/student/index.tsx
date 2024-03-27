import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

function Student() {
  const { user } = useContext(AuthContext);

  const [studentName, setStudentName] = useState("");
  const [plate, setPlate] = useState("");

  useEffect(() => {
    fetchUsers(); 
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      // Lógica para tratar a resposta e armazenar os usuários, se necessário
    } catch (error) {
      console.error("Não foi possível carregar os usuários", error);
    }
  };

  const handleNameChange = (text: string) => {
    setStudentName(text);
  };
  
  const handlePlateChange = (text: string) => {
    setPlate(text);
  };

  const handleCadastroClick = async () => {
    if (studentName === "" || plate === "") {
      Alert.alert("Preencha todos os campos");
      return;
    }

    try {
      const response = await api.post("/student", {
        name: studentName,
        plate: plate,
        responsible_id: user.id,
      });

      if (response.status === 200) {
        Alert.alert("Aluno cadastrado com sucesso");
        setStudentName("");
        setPlate("");
      } else {
        Alert.alert("Erro ao cadastrar aluno");
      }
    } catch (error) {
      const erroCreatedStudent = (error as Error).message;
      Alert.alert(erroCreatedStudent);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Preencha os campos abaixo para realizar
         o cadastro do aluno
      </Text>

      <View style={styles.formContainer}>
        <Text style={styles.tags}>Nome do aluno:</Text>
        <TextInput
          style={styles.input}
          value={studentName}
          onChangeText={handleNameChange}
          placeholder="Nome do estudante"
        />

        <Text style={styles.tags}>Matrícula do aluno:</Text>
        <TextInput
          style={styles.input}
          value={plate}
          onChangeText={handlePlateChange}
          placeholder="Matrícula do aluno"
        />

        <TouchableOpacity onPress={handleCadastroClick} style={styles.buttonAdd}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    width: '80%',
    marginTop: 50,
  },
  tags: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 6
  },
  buttonAdd: {
    marginTop: 280,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2223C",
    height: 50
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default Student;
