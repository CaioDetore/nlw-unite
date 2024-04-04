import { useState } from "react";
import { Alert, Image, View } from "react-native";

import { Link, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "@/styles/colors";

import { api } from "@/server/api";
import { useBadgeStore } from "@/store/badge-store";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function Home() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const badgeStore = useBadgeStore();

  async function handleAccessCredential() {
    if (!code.trim()) {
      return Alert.alert("Credencial", "Informe o código do ingresso!");
    }

    try {
      setLoading(true);

      const { data } = await api.get(`/attendees/${code}/badge`);
      badgeStore.save(data.badge);
    } catch (err) {
      Alert.alert("Ingresso", "Ingresso não encontrado!");
    } finally {
      setLoading(false);
    }
  }

  if (badgeStore.data?.checkInURL) {
    return <Redirect href="/ticket" />
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
          <Input.Field
            placeholder="Código do ingresso"
            value={code}
            onChangeText={setCode}
          />
        </Input>

        <Button
          isLoading={loading}
          title="Acessar credencial"
          onPress={handleAccessCredential}
        />

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
