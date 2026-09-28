import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { formatViews } from '../services/api';

export default function DetailsScreen({ route }) {
  const { video } = route.params;

  const openVideo = async () => {
    try {
      await Linking.openURL(video.url);
    } catch {
      Alert.alert('Erro', 'Não foi possível abrir o link.');
    }
  };

  const Row = ({ label, value }) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: video.thumbnail }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{video.title}</Text>

        <Row label="Canal" value={video.channel} />
        <Row label="Visualizações" value={`${video.views?.toLocaleString('pt-BR')} (${formatViews(video.views)})`} />
        <Row label="Duração" value={video.duration} />
        <Row label="Publicado" value={video.uploaded} />
        <Row label="Tipo" value={video.type} />

        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>{video.description || 'Sem descrição.'}</Text>

        <TouchableOpacity style={styles.button} onPress={openVideo} activeOpacity={0.8}>
          <Text style={styles.buttonText}>▶ Assistir no YouTube</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 220, backgroundColor: '#e2e8f0' },
  body: { padding: 16 },
  title: { fontSize: 22, fontWeight: '800', color: '#0f172a', marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  label: { color: '#64748b', fontWeight: '600' },
  value: { color: '#0f172a', flexShrink: 1, textAlign: 'right', marginLeft: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 20, marginBottom: 6, color: '#0f172a' },
  description: { color: '#334155', lineHeight: 22 },
  button: { backgroundColor: '#ef4444', padding: 15, borderRadius: 30, alignItems: 'center', marginTop: 24, marginBottom: 30 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
