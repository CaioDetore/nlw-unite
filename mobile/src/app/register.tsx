import { Image, View } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { colors } from "@/styles/colors";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function Register() {
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
          <MaterialIcons
            size={20}
            name="person"
            color={colors.green[200]}
          />
          <Input.Field placeholder="Nome completo" />
        </Input>

        <Input>
          <MaterialIcons
            size={20}
            name="alternate-email"
            color={colors.green[200]}
          />
          <Input.Field placeholder="E-mail" keyboardType="email-address" />
        </Input>

        <Button title="Realizar Inscrição" />

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
