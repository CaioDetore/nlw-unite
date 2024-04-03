import { useState } from "react";
import {
  View,
  Text,
  Modal,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

import { colors } from "@/styles/colors";

import { Header } from "@/components/header";
import { Button } from "@/components/button";
import { Credential } from "@/components/credential";
import { QRCode } from "@/components/qrcode";

export default function Ticket() {
  const [image, setImage] = useState("");
  const [expandQRCode, setExpandQRCode] = useState(false);

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });

      if (result.assets) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Foto", "Não foi possível selecionar a imagem.");
    }
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar style="light" />
      <Header title="Minha Credencial" />

      <ScrollView
        className="-mt-28 -z-10"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-8 pb-8"
      >
        <Credential
          image={image}
          onChangeAvatar={handleSelectImage}
          onExpandQRCode={() => setExpandQRCode(true)}
        />

        <FontAwesome
          name="angle-double-down"
          size={24}
          color={colors.gray[300]}
          className="self-center my-6"
        />

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do Unite Summer
        </Text>

        <Button title="Compartilhar" />

        <TouchableOpacity activeOpacity={0.7}>
          <View className="mt-10">
            <Text className="text-base text-white font-bold text-center">
              Remover Ingresso
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={expandQRCode} statusBarTranslucent animationType="slide">
        <View className="flex-1 bg-green-500 items-center justify-center">
          <QRCode value="teste" size={300} />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setExpandQRCode(false)}
          >
            <View className="mt-10">
              <Text className="font-bold text-orange-500 text-sm">
                Fechar QRCode
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
