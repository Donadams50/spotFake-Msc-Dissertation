import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D1461',
  },
  welcomeBack: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 60,
    color: '#fff',
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginVertical: 10,
  },
  instructions: {
    textAlign: 'center',
    fontSize: 14,
    color: '#222222',
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  topContainer:{
    marginBottom: 65
  },
  downContainer:{
    backgroundColor: '#FAFBFF',
    padding: 20,
    borderTopLeftRadius: 70
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginLeft: 10,
  },
  eyeIcon: {
    marginRight: 10,
  },
  forgotPassword: {
    textAlign: 'left',
    color: '#2D1461',
    marginVertical: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#2D1461',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signinOptions: {
    alignItems: 'center',
    marginVertical: 20,
  },
  signinText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  signupText: {
    fontSize: 16,
    color: '#000',
  },
  signupLink: {
    fontSize: 16,
    color: '#6C63FF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default styles;
