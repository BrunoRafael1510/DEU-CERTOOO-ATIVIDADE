import { Button } from "@/components/Button";

import { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";

import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function List() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const router = useRouter();

  const carregarProdutos = async () => {
    const snapshot = await getDocs(collection(db, "produtos"));
    const lista: any[] = [];

    snapshot.forEach((doc) => {
      lista.push({ id: doc.id, ...doc.data() });
    });

    setProdutos(lista);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos</Text>
      <Text style={styles.subtitle}>Lista cadastrada</Text>

      <ScrollView style={styles.list}>
        {produtos.map((p) => (
          <View key={p.id} style={styles.item}>
            <Text style={styles.nome}>{p.nome}</Text>
            <Text style={styles.preco}>R$ {p.preco}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttons}>
        <Button label="Atualizar" onPress={carregarProdutos} />
        <Button label="Voltar" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    padding: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    marginTop: 10,
  },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  nome: {
    fontSize: 18,
    fontWeight: "700",
  },
  preco: {
    fontSize: 16,
    color: "#555",
  },
  buttons: {
    marginTop: 20,
    gap: 12,
  },
});