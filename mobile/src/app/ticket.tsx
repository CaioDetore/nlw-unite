import { useState } from "react";
import {
  View,
  Text,
  Modal,
  Alert,
  ScrollView,
  TouchableOpacity,
  Share,
} from "react-native";

import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { colors } from "@/styles/colors";

import { Header } from "@/components/header";
import { Button } from "@/components/button";
import { QRCode } from "@/components/qrcode";
import { Credential } from "@/components/credential";

import { MotiView } from "moti";

import { useBadgeStore } from "@/store/badge-store";

export default function Ticket() {
  const [expandQRCode, setExpandQRCode] = useState(false);

  const badgeStore = useBadgeStore();

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });

      if (result.assets) {
        badgeStore.updateAvatar(result.assets[0].uri);
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Foto", "Não foi possível selecionar a imagem.");
    }
  }

  async function handleShare() {
    try {
      if (badgeStore.data?.checkInURL) {
        await Share.share({
          message: badgeStore.data.checkInURL,
        });
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Compartilhar", "Não foi possível compartilhar");
    }
  }

  if (!badgeStore.data?.checkInURL) {
    return <Redirect href={"/"} />;
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
          data={badgeStore.data}
          onChangeAvatar={handleSelectImage}
          onExpandQRCode={() => setExpandQRCode(true)}
        />

        <MotiView
          from={{ translateY: 0 }}
          animate={{ translateY: 10 }}
          transition={{ loop: true, type: "timing", duration: 700 }}
        >
          <FontAwesome
            name="angle-double-down"
            size={24}
            color={colors.gray[300]}
            className="self-center my-6"
          />
        </MotiView>

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do{" "}
          {badgeStore.data.eventTitle}!
        </Text>

        <Button title="Compartilhar" onPress={handleShare} />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => badgeStore.remove()}
        >
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
