import { useState } from "react";
import { Alert, Image, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import axios from "axios";
import { useBadgeStore } from "@/store/badge-store";

import { api } from "@/server/api";
import { colors } from "@/styles/colors";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

const EVENT_ID = "9e9bd979-9d10-4915-b339-3786b1634f33";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const badgeStore = useBadgeStore();

  async function handleRegister() {
    if (!name || !email) {
      return Alert.alert("Inscrição", "Preencha todos os campos");
    }

    try {
      setLoading(true);
      const res = await api.post(`/events/${EVENT_ID}/attendees`, {
        name,
        email,
      });

      if (res.data.attendeeId) {
        const { data } = await api.get(
          `/attendees/${res.data.attendeeId}/badge`
        );

        badgeStore.save(data.badge);

        Alert.alert("Inscrição", "Inscrição realizada com sucesso!", [
          { text: "OK", onPress: () => router.push("/ticket") },
        ]);
      }
    } catch (err) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        if (err.response?.data.message) {
          if (
            String(err.response?.data.message.includes("already registered"))
          ) {
            Alert.alert("Inscrição", "Esse e-mail já está cadastrado!");
          }
        }
      }

      Alert.alert("Inscrição", "Não foi possível se inscrever");
    } finally {
      setLoading(false);
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
          <MaterialIcons size={20} name="person" color={colors.green[200]} />
          <Input.Field
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
          />
        </Input>

        <Input>
          <MaterialIcons
            size={20}
            name="alternate-email"
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="E-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </Input>

        <Button
          isLoading={loading}
          title="Realizar Inscrição"
          onPress={handleRegister}
        />

        <Link
          href="/"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Já possui ingresso?
        </Link>
      </View>
    </View>
  );
}
