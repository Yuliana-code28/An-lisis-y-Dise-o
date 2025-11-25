import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PerfilScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Perfil */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Yuliana Valdez</Text>
          <Text style={styles.email}>vaidezyuliana18@gmail.com</Text>
          <Text style={styles.status}>Pasajero</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>28</Text>
              <Text style={styles.statLabel}>Viajes</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>$840</Text>
              <Text style={styles.statLabel}>Ahorrados</Text>
            </View>
            {/*<View style={styles.statBox}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View> */}
          </View>
        </View>

        {/* Sección Cuenta */} 
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Configuración</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Notificaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Métodos de Pago</Text>
          </TouchableOpacity>
        </View>

        {/* Sección Ayuda */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ayuda</Text>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Soporte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Contacto</Text>
          </TouchableOpacity>
        </View>
        {/* Botón Volverse conductor */}
        <TouchableOpacity 
        style={styles.driverBtn} 
        onPress={() => navigation.navigate('Conductor')}
        >
            <Text style={styles.driverText}>Volverse conductor</Text>
        </TouchableOpacity>


        {/* Botón cerrar sesión */}
        <TouchableOpacity 
          style={styles.logoutBtn} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
  container: {
    flex: 1,
    backgroundColor: PASTEL.sky,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: PASTEL.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: PASTEL.textDark,
  },
  email: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: PASTEL.textDark,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  section: {
    backgroundColor: PASTEL.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: PASTEL.textDark,
    marginBottom: 12,
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: PASTEL.border,
  },
  optionText: {
    fontSize: 14,
    color: PASTEL.textDark,
  },
  logoutBtn: {
    backgroundColor: PASTEL.accent,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: PASTEL.textDark,
  },
  driverBtn: {
  backgroundColor: '#FEE2E2', // rojo pastel claro
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: 'center',
  marginBottom: 12,
  borderWidth: 1,
  borderColor: '#FCA5A5',
    },
driverText: {
  fontSize: 16,
  fontWeight: '700',
  color: '#B91C1C', // rojo fuerte
},

});
