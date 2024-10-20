import React, { FC } from "react";
import {
  ActivityIndicator,
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import ayaxLogo from "../../../assets/ayax-logo.png";
import { Color } from "../../../constants/Color";
import facebookLogo from "../../../assets/facebook.png";
import googleLogo from "../../../assets/google.png";
import { AuthScreenViewProp } from "../../../type";

const RegisterScreenView: FC<AuthScreenViewProp> = ({
  name,
  setName,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  navigation,
  error,
  isLoading,
  handleRegister,
}) => {
  return (
    <View style={styles.container}>
      <Image source={ayaxLogo} style={styles.logo} />
      <Text style={styles.title}>Register Your Account</Text>

      <View style={styles.inputContainer}>
        <Icon
          name="drive-file-rename-outline"
          size={24}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="person" size={24} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="email" size={24} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Icon
          name="visibility-off"
          size={24}
          color="#888"
          style={styles.icon}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.rememberContainer}>
        <Switch
          value={rememberMe}
          onValueChange={setRememberMe}
          thumbColor={rememberMe ? Color.secondary : "#f4f4f4"}
          trackColor={{ false: "#767577", true: Color.primary }}
        />
        <Text style={styles.rememberText}>Remember me</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        {isLoading ? (
          <ActivityIndicator size="small" color="gray" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity>
        <Text
          style={styles.forgotPassword}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Forgot the password?
        </Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or continue with</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={facebookLogo} style={styles.socialLogo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={googleLogo} style={styles.socialLogo} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.signUpText}>
          Already have an account?{" "}
          <Text
            style={styles.signUpLink}
            onPress={() => navigation.navigate("SignIn")}
          >
            Sign In
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreenView;
