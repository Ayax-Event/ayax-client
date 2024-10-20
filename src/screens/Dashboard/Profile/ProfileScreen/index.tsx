import React, { useContext, useState } from "react";
import ProfileScreenView from "./view";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../../../contexts/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { postProfilePict } from "../../../../utils/api";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { setIsLoggedIn, setUser, user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigation();

  const showImagePickerOptions = async () => {
    Alert.alert("Change Profile Picture", "Choose a new profile picture", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Take Photo",
        onPress: () => launchCamera(),
      },
      {
        text: "Choose from Gallery",
        onPress: () => launchImageLibrary(),
      },
    ]);
  };

  const launchCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "Camera access is required to take photos."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 0.5,
    });

    handleImagePickerResult(result);
  };

  const launchImageLibrary = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "Gallery access is required to choose photos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 0.5,
    });

    handleImagePickerResult(result);
  };

  const handleImagePickerResult = async (
    result: ImagePicker.ImagePickerResult
  ) => {
    if (!result.canceled) {
      setIsLoading(true);
      try {
        const formData = new FormData();

        formData.append(
          "profilePict",
          `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`
        );

        const res = await postProfilePict(formData);
        console.log(res.data, "<<<<<<<");
        const newImageUrl = res.data.profilePictUrl;

        setUser({
          ...user,
          profilepict: newImageUrl,
        });

        // You might also want to update the stored user data
        const updatedUser = {
          ...user,
          profilepict: newImageUrl,
        };
        await SecureStore.setItemAsync("user", JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Error updating profile picture:", error);
        Alert.alert(
          "Error",
          "Failed to update profile picture. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileScreenView
      user={user}
      handleLogout={handleLogout}
      handleEditProfilePicture={showImagePickerOptions}
      isLoading={isLoading}
      navigation={nav}
    />
  );
};

export default ProfileScreen;
