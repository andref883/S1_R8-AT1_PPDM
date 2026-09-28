import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🎬</Text>
        <Text style={styles.title}>VídeoFinder</Text>
        <Text style={styles.description}>
          Aplicativo que consome uma API pública de busca de vídeos do YouTube.
          Veja uma lista de vídeos, com título, canal, visualizações e duração,
          e toque em qualquer item para ver os detalhes completos.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Lista')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Acessar vídeos</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>Fonte: abhi-api.vercel.app</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28 },
  emoji: { fontSize: 72, marginBottom: 12 },
  title: { fontSize: 36, fontWeight: '800', color: '#fff', marginBottom: 14 },
  description: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 36,
  },
  button: {
    backgroundColor: '#ef4444',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  footer: { textAlign: 'center', color: '#64748b', paddingBottom: 16, fontSize: 12 },
});
