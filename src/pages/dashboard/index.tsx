import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";

interface User {
  id: string;
}

const MyTable = () => {
  const [aluno, setAluno] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [tabelaData, setTabelaData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState<any>(null);
  const [filtro, setFiltro] = useState("");

  const { user } = useContext(AuthContext) as { user: User };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get(`/student/resposible/${user.id}`);
        setAlunos(response.data);
        setAluno(response.data[0]?.id);
      } catch (error) {
        console.error("Erro ao buscar a lista de estudantes:", error);
      }
    };

    fetchStudents();
  }, [user]);

  const handlePesquisa = async () => {
    try {
      if (!aluno) {
        alert('Selecione um aluno');
        return;
      }

      const response = await api.get(`/order/detail/student?student_id=${aluno}`);
      const data = response.data;
      setTabelaData(data);
    } catch (error) {
      console.error("Erro ao buscar os pedidos do aluno", error);
    }
  };

  const calculateTotal = (order: any) => {
    let total = 0;
    order.items.forEach((item: any) => {
      const price = item.product.price;
      total += price * item.amount;
    });
    return total.toFixed(2);
  };

  const handleOpenModal = (item: any) => {
    setModalItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={{fontWeight:'bold', fontSize: 20 , marginLeft: '4%'}}>Selecione o aluno:</Text>  
      <View style={styles.pickerContainer}>
  <Picker
    selectedValue={aluno}
    onValueChange={(itemValue: any) => setAluno(itemValue)}
    style={styles.picker}
  >
    {alunos.map((student: any) => (
      <Picker.Item
        key={student.id}
        label={student.name}
        value={student.id}
      />
    ))}
  </Picker>
</View>

      <TouchableOpacity style={styles.button} onPress={handlePesquisa}>
        <Text style={styles.buttonText}>Pesquisar</Text>
      </TouchableOpacity>

      <FlatList
        data={tabelaData.filter((order: any) =>
          order.name.toLowerCase().includes(filtro.toLowerCase())
        )}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleOpenModal(item)}
            style={styles.item}
          >
            <Text>ID do Pedido: {item.id}</Text>
            <Text>Nome do Pedido: {item.name}</Text>
            <View style={styles.totalContainer}>
            <Text>Total: ...............................  </Text>
             <Text style={{fontWeight: 'bold', color: 'green'}}>R$ {calculateTotal(item)}</Text>
            </View>
           
           
          </TouchableOpacity>
        )}
      />

      {/* Modal de detalhes do pedido */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={handleCloseModal}
        onSwipeComplete={handleCloseModal}
        swipeDirection="down"
      >
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>

          {modalItem && (
            <View>
              <FlatList
                data={modalItem.items}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.modalItem}>
                    <Text>Produto: {item.product.name}</Text>
                    <Text>Preço: R$ {item.product.price}</Text>
                    <Text>Quantidade: {item.amount}</Text>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    button: {
      backgroundColor: "#F2223C",
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      height: 50
    },
    buttonText: {
      color: "white",
      justifyContent: 'center',
      fontWeight: 'bold',
    },
    item: {
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 5,
    },
    pickerContainer: {
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      picker: {
        height: 50,
        width: "100%",
          },
    modalContent: {
      backgroundColor: "#ffffff",
      padding: 20,
      borderRadius: 10,
      borderColor: "#ccc",
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalHeader: {
      marginBottom: 20,
      borderBottomColor: "#ccc",
      borderBottomWidth: 1,
    },
    modalHeaderText: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    modalItemContainer: {
      marginBottom: 15,
    },
    modalItemName: {
      fontSize: 16,
      marginBottom: 5,
    },
    modalItemPrice: {
      fontSize: 14,
      color: "#888",
    },
    closeButton: {
      backgroundColor: "#F2223C",
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    closeButtonText: {
      color: "white",
      textAlign: 'center',
      fontWeight: 'bold'
    },
    modalItem: {
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 5,
    },
    totalContainer:{
     flexDirection: "row",
      alignItems: 'center'
    }
  });
  
  
  export default MyTable;
  


