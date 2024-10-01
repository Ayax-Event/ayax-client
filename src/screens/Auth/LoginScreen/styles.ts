import { StyleSheet } from "react-native";
import { Color } from "../../../constants/Color";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  rememberText: {
    fontSize: 14,
    color: "#555",
  },
  button: {
    backgroundColor: Color.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: Color.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  orText: {
    textAlign: "center",
    color: "#888",
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  socialButton: {
    marginHorizontal: 10,
  },
  socialLogo: {
    width: 30,
    height: 30,
  },
  signUpText: {
    textAlign: "center",
    color: "#888",
  },
  signUpLink: {
    color: Color.primary,
  },
});
