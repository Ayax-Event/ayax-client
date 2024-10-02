import { FC } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import facebookLogo from "../../../assets/facebook.png";
import googleLogo from "../../../assets/google.png";
import { Color } from "../../../constants/Color";
import { LoginScreenViewProps } from "../../../type";
import ayaxLogo from "../../../assets/ayax-logo.png";

const LoginScreenView: FC<LoginScreenViewProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  rememberMe,
  setRememberMe,
  navigation,
  error,
  isLoading,
}) => {
  return (
    <View style={styles.container}>
      <Image source={ayaxLogo} style={styles.logo} />
      <Text style={styles.title}>Login to Your Account</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {isLoading ? (
          <ActivityIndicator size="small" color="gray" />
        ) : (
          <Text style={styles.buttonText}>Sign in</Text>
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
          Don’t have an account?{" "}
          <Text
            style={styles.signUpLink}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign up
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreenView;
