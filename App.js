import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {

  const [state, setState] = useState("leitura")
  const [anotacoes, setAnotacoes] = useState("")

  useEffect(() => {
    (async () => {
      try {
        const anotacoesSalvas = await AsyncStorage.getItem("anotacao")
        setAnotacoes(anotacoesSalvas)
      } catch (error) {

      }
    })()
  }, [])

  setData = async () => {
    try {
      await AsyncStorage.setItem("anotacao", anotacoes)
    } catch (error) { }
  }

  function attText() {
    setState("leitura")
    setData()
  }

  if (state == "leitura") {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <View style={styles.header}>
          <Text style={{ color: "#fff", fontSize: 22, textAlign: "center" }}>Aplicativo de Anotação</Text>
        </View>

        {
          (anotacoes != "") ?
            <>
              <View style={styles.anotacoes}>
                <Text style={styles.anotacoesText}>{anotacoes}</Text>
              </View>
              <TouchableOpacity onPress={() => setState("atualizando")} style={styles.btnAnotacoes}><Icon name="pencil" size={30} color="#fff" /></TouchableOpacity>
            </>
            :
            <>
              <View style={styles.NullAnotacoes}>
                <Text style={styles.NullAnotacoesText}>Você não possui nenhuma anotação</Text>
                <Text style={styles.NullAnotacoesText}>:-(</Text>
              </View>
              <TouchableOpacity onPress={() => setState("atualizando")} style={styles.btnAnotacoes}><Text style={styles.btnAnotacoesText}>+</Text></TouchableOpacity>
            </>
        }
      </View>
    );
  } else if (state == "atualizando") {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <View style={styles.header}>
          <Text style={{ color: "#fff", fontSize: 22, textAlign: "center" }}>Aplicativo de Anotação</Text>
        </View>
        <View style={styles.ContainerTitleEdit}>
          {
            (anotacoes != "") ?
              <Text style={styles.TitleEdit}>Edite sua anotaçao: </Text>
              :
              <Text style={styles.TitleEdit}>Adcione uma anotaçao: </Text>
          }
        </View>
        <TextInput autoFocus={true} numberOfLines={5} onChangeText={text => setAnotacoes(text)} multiline={true} value={anotacoes} style={styles.changeAnotacoes} />
        <TouchableOpacity onPress={() => attText()} style={styles.btnAnotacoesSave}><Text style={styles.btnAnotacoesTextSave}>✔</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#069',
    width: "100%",
    padding: 20
  },
  anotacoes: {
    padding: 20,

  },
  anotacoesText: {
    fontSize: 20,
  },
  NullAnotacoes: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  NullAnotacoesText: {
    fontSize: 30,
    textAlign: "center",
    opacity: 0.5

  },
  btnAnotacoes: {
    backgroundColor: "#069",
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btnAnotacoesText: {
    fontSize: 30,
    color: "#fff"
  },
  btnAnotacoesTextSave: {
    fontSize: 18,
    color: "#fff"
  },
  btnAnotacoesSave: {
    backgroundColor: "#069",
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  changeAnotacoes: {
    padding: 20,
    borderWidth: 3,
    borderColor: "#c3c3c3",
    maxHeight: 170
  },
  ContainerTitleEdit: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 50,
  },
  TitleEdit: {
    fontSize: 30
  }
});