import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform, Alert, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terminos, setTerminos] = useState(false); 

  const mostrarAlertas = () => {
    if (email.trim() === '' || password.trim() === '') {
      if (Platform.OS === 'web') {
        alert('Por favor, escribe tu correo electrónico y contraseña para continuar.');
      } else {
        Alert.alert(
          'Error',
          'Por favor, escribe tu correo electrónico y contraseña para continuar.',
          [
            { text: 'Cancelar' },
            { text: 'Aceptar' }
          ]
        );
      }
      return;
    }

    if (!email.includes('@')) {
      if (Platform.OS === 'web') {
        alert('El correo debe contener el símbolo @');
      } else {
        Alert.alert(
          'Correo inválido',
          'El correo debe contener arroba @ ',
          [
            { text: 'Aceptar' }
          ]
        );
      }
      return;
    }

    if (!terminos) {
      if (Platform.OS === 'web') {
        alert('Favor de aceptar los términos y condiciones para poder continuar.');
      } else {
        Alert.alert(
          'Términos no aceptados',
          'Favor de aceptar los términos y condiciones para poder continuar.',
          [
            { text: 'Cancelar' },
            { text: 'Aceptar' }
          ]
        );
      }
      return; 
    }

    // ✅ Navegación a InicioScreen
    Alert.alert('Bienvenida', 'Has iniciado sesión correctamente.', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Inicio'),
      },
    ]);
  };

  return (
    <LinearGradient  
      colors={['#3a7bd5', '#3A6073']} 
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Ionicons name="person-circle-outline" size={80} color="white" />
        <Text style={styles.title}>Iniciar Sesión</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType='email-address'
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.switchStyle}>
            <Text style={styles.switchText}>Aceptar términos y condiciones </Text>
            <Switch value={terminos} onValueChange={() => setTerminos(!terminos)} />
        </View>
        <TouchableOpacity style={styles.button} onPress={mostrarAlertas}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 15,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    color: 'white',
    marginVertical: 10,
  },
  button: {
    width: '90%',
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3a7bd5',
  },
  registerText: {
    color: 'white',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  switchStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff20',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '90%',
    height:'15%',
    marginVertical: 5,
  },
  switchText: {
    color: 'white',
    fontSize: 14,
  },
});

export default LoginScreen;
