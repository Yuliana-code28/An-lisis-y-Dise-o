import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, Alert, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

export default function ConductorScreen() {
  const navigation = useNavigation();

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [vehiculo, setVehiculo] = useState('');
  const [matriculaVehiculo, setMatriculaVehiculo] = useState('');
  const [matriculaEstudiante, setMatriculaEstudiante] = useState('');
  const [fotoLicencia, setFotoLicencia] = useState(null);
  const [fotoVehiculo, setFotoVehiculo] = useState(null);
  const [terminos, setTerminos] = useState(false);

  // Función genérica para elegir imagen
  const seleccionarImagen = async (tipo, setter) => {
    Alert.alert(tipo, 'Selecciona una opción:', [
      {
        text: 'Tomar foto con cámara',
        onPress: async () => {
          const permiso = await ImagePicker.requestCameraPermissionsAsync();
          if (!permiso.granted) {
            Alert.alert('Permiso denegado', 'No se puede acceder a la cámara.');
            return;
          }
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
          });
          if (!result.canceled) {
            setter(result.assets[0].uri);
          }
        },
      },
      {
        text: 'Elegir desde galería',
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });
          if (!result.canceled) {
            setter(result.assets[0].uri);
          }
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const enviarSolicitud = () => {
    if (
      !nombre ||
      !telefono ||
      !correo ||
      !vehiculo ||
      !matriculaVehiculo ||
      !matriculaEstudiante ||
      !fotoLicencia ||
      !fotoVehiculo ||
      !terminos
    ) {
      Alert.alert('Formulario incompleto', 'Por favor llena todos los campos, sube las fotos y acepta los términos.');
      return;
    }

    Alert.alert('Solicitud enviada', 'Tu solicitud para volverte conductor ha sido enviada con éxito.', [
      { text: 'OK', onPress: () => navigation.navigate('Home') },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Formulario para Volverse Conductor</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={nombre}
          onChangeText={setNombre}
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="Número de teléfono"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          value={correo}
          onChangeText={setCorreo}
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo de vehículo (auto, moto)"
          value={vehiculo}
          onChangeText={setVehiculo}
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="Matrícula del vehículo"
          value={matriculaVehiculo}
          onChangeText={setMatriculaVehiculo}
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="Matrícula de estudiante"
          value={matriculaEstudiante}
          onChangeText={setMatriculaEstudiante}
          placeholderTextColor="#ccc"
        />

        {/* Campo interactivo para licencia */}
        <TouchableOpacity style={styles.imageInput} onPress={() => seleccionarImagen('Licencia de conducir', setFotoLicencia)}>
          <Text style={styles.imageInputText}>
            {fotoLicencia ? 'Licencia seleccionada ✅' : 'Licencia de conducir (toca para subir)'}
          </Text>
        </TouchableOpacity>
        {fotoLicencia && <Image source={{ uri: fotoLicencia }} style={styles.previewImage} />}

        {/* Campo interactivo para foto del vehículo */}
        <TouchableOpacity style={styles.imageInput} onPress={() => seleccionarImagen('Foto del vehículo', setFotoVehiculo)}>
          <Text style={styles.imageInputText}>
            {fotoVehiculo ? 'Foto del vehículo seleccionada ✅' : 'Foto del vehículo (toca para subir)'}
          </Text>
        </TouchableOpacity>
        {fotoVehiculo && <Image source={{ uri: fotoVehiculo }} style={styles.previewImage} />}

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Aceptar términos y condiciones</Text>
          <Switch value={terminos} onValueChange={() => setTerminos(!terminos)} />
        </View>

        <TouchableOpacity style={styles.button} onPress={enviarSolicitud}>
          <Text style={styles.buttonText}>Enviar solicitud</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const PASTEL = {
  sky: '#7EC8E3',
  white: '#FFFFFF',
  textDark: '#1F2937',
  border: '#E5E7EB',
  accent: '#F7B2BD',
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: PASTEL.sky,
  },
  container: {
    padding: 20,
    paddingTop: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: PASTEL.textDark,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: PASTEL.white,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 8,
    color: PASTEL.textDark,
    borderWidth: 1,
    borderColor: PASTEL.border,
  },
  imageInput: {
    width: '100%',
    backgroundColor: '#E0F2FE',
    paddingVertical: 14,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#90CDF4',
    alignItems: 'center',
  },
  imageInputText: {
    color: '#0369A1',
    fontWeight: '600',
    fontSize: 14,
  },
  previewImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginTop: 10,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 12,
    paddingHorizontal: 10,
  },
  switchText: {
    fontSize: 14,
    color: PASTEL.textDark,
  },
  button: {
    backgroundColor: PASTEL.accent,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: PASTEL.textDark,
  },
});
