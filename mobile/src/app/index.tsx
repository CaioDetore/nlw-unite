import { useState } from "react";
import { Alert, Image, View } from "react-native";

import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "@/styles/colors";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function Home() {
  const [code, setCode] = useState('');

  function handleAccessCredential() {
    if (!code.trim()) {
      return Alert.alert("Credencial", "Informe o código do ingresso!")
    }
  }

  return (
    <View className="flex-1 bg-green-500 items-center justify-center p-8">
      <StatusBar style="light" />
      <Image
        source={require("@/assets/logo.png")}
        className="h-16"
        resizeMode="contain"
      />

      <View className="w-full mt-12 gap-3">
        <Input>
          <MaterialCommunityIcons
            size={20}
            color={colors.green[200]}
            name="ticket-confirmation-outline"
          />
          <Input.Field placeholder="Código do ingresso" value={code} onChangeText={setCode} />
        </Input>

        <Button title="Acessar credencial" onPress={handleAccessCredential} />

        <Link
          href="/register"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  );
}
