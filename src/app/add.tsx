import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import { useRouter } from "expo-router";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Add() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  const handleAdd = async () => {
    if (!nome || !preco) {
      return Alert.alert("Erro", "Preencha tudo");
    }

    try {
      await addDoc(collection(db, "produtos"), {
        nome,
        preco,
      });

      Alert.alert("Sucesso", "Produto cadastrado!");
      setNome("");
      setPreco("");
    } catch (e: any) {
      Alert.alert("Erro", e.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Cadastrar Produto</Text>
          <Text style={styles.subtitle}>
            Adicione um novo produto
          </Text>

          <View style={styles.form}>
            <Input
              placeholder="Nome do produto"
              value={nome}
              onChangeText={setNome}
            />

            <Input
              placeholder="Preço"
              value={preco}
              onChangeText={setPreco}
            />

            <Button label="Salvar" onPress={handleAdd} />
            <Button label="Voltar" onPress={() => router.back()} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    padding: 32,
    justifyContent: "center"
  },
  form: {
    marginTop: 24,
    gap: 12
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center"
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center"
  }
});