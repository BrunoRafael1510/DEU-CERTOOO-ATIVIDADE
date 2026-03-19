import { Button } from "@/components/Button";

import { Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>O que deseja fazer?</Text>

      <View style={styles.form}>
        <Button
          label="Cadastrar Produto"
          onPress={() => router.push("./add" as any)}
        />

        <Button
          label="Ver Produtos"
          onPress={() => router.push("./list" as any)}
        />

        <Button
          label="Sair"
          onPress={() => router.replace("/")}
        />
      </View>
    </View>
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