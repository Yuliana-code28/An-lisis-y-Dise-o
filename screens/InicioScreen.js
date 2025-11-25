import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InicioScreen() {
  const navigation = useNavigation();
  const [region, setRegion] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se pudo acceder a la ubicación.');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {region && (
        <MapView style={styles.map} initialRegion={region}>
          <Marker
            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
            title="Tu ubicación"
            description="Ubicación actual"
          />
        </MapView>
      )}

      {/* Header banner */}
      <SafeAreaView style={styles.header}>
        <Text style={styles.logo}>RideU</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerBtn}>
            <Text style={styles.headerBtnText}>Notifs</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.headerBtn, styles.profileCircle]} 
            onPress={() => navigation.navigate('Perfil')}
          >
            <Text style={styles.headerBtnText}>YU</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Search bar overlay */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="¿A dónde quieres ir hoy?"
          placeholderTextColor="#9AA0A6"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchAction}>
          <Text style={styles.searchActionText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Floating primary action */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>Solicitar ride</Text>
      </TouchableOpacity>

      {/* Floating "+" button */}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('NuevaScreen')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const PASTEL = {
  white: '#FFFFFF',
  bgGlass: 'rgba(255,255,255,0.92)',
  textDark: '#1F2937',
  accent: '#7EC8E3',
  accent2: '#F7B2BD',
  border: '#E5E7EB',
  shadow: 'rgba(0,0,0,0.08)',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PASTEL.white,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  // Header banner
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: PASTEL.white,
    borderBottomWidth: 1,
    borderColor: PASTEL.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: PASTEL.textDark,
    letterSpacing: 0.5,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  headerBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: PASTEL.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: PASTEL.border,
  },
  headerBtnText: {
    color: PASTEL.textDark,
    fontWeight: '600',
  },
  profileCircle: {
    borderRadius: 18,
  },

  // Search overlay
  searchBar: {
  position: 'absolute',
  top: Platform.OS === 'ios' ? 150 : 130, // espacio extra entre banner y barra
  left: 16,
  right: 16,
  flexDirection: 'row',
  alignItems: 'center', 
  backgroundColor: PASTEL.bgGlass,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: PASTEL.border,
  padding: 8,
  gap: 8,
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 6,
  },
  searchInput: {
    flex: 1,
    backgroundColor: PASTEL.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: PASTEL.textDark,
    borderWidth: 1,
    borderColor: PASTEL.border,
  },
  searchAction: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: PASTEL.accent,
    borderRadius: 12,
  },
  searchActionText: {
    color: '#083344',
    fontWeight: '700',
  },

  // Floating Action Button
  fab: {
    position: 'absolute',
    bottom: 28,
    left: 16,
    right: 16,
    backgroundColor: PASTEL.accent2,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    borderWidth: 1,
    borderColor: PASTEL.border,
  },
  fabText: {
    color: PASTEL.textDark,
    fontWeight: '800',
    letterSpacing: 0.2,
  },

  // Floating "+" button
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: PASTEL.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    borderWidth: 1,
    borderColor: PASTEL.border,
  },
  addButtonText: {
    fontSize: 32,
    color: '#083344',
    fontWeight: 'bold',
    marginTop: -2,
  },
});
