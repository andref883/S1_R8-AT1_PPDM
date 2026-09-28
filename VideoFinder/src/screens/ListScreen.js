import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { DEFAULT_QUERIES, searchMany, searchVideo, formatViews } from '../services/api';

export default function ListScreen({ navigation }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const [adding, setAdding] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(null);
      const data = await searchMany(DEFAULT_QUERIES);
      if (data.length === 0) throw new Error('Não foi possível carregar os vídeos.');
      setVideos(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  const addSearch = async () => {
    const q = text.trim();
    if (!q) return;
    Keyboard.dismiss();
    setAdding(true);
    try {
      const video = await searchVideo(q);
      setVideos((prev) =>
        prev.some((v) => v.url === video.url) ? prev : [video, ...prev]
      );
      setText('');
    } catch (e) {
      setError(e.message);
    } finally {
      setAdding(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('Detalhes', { video: item })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
      <View style={styles.info}>
        <Text style={styles.videoTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.channel}>📺 {item.channel}</Text>
        <Text style={styles.meta}>👁 {formatViews(item.views)} views</Text>
        <Text style={styles.meta}>⏱ {item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ef4444" />
        <Text style={styles.loadingText}>Carregando vídeos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Buscar novo vídeo..."
          placeholderTextColor="#94a3b8"
          value={text}
          onChangeText={setText}
          onSubmitEditing={addSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.addBtn} onPress={addSearch} disabled={adding}>
          {adding ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.addBtnText}>Buscar</Text>
          )}
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </View>
      )}

      <FlatList
        data={videos}
        keyExtractor={(item) => item.url}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12 }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum vídeo. Puxe para atualizar.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9' },
  loadingText: { marginTop: 12, color: '#475569' },
  searchRow: { flexDirection: 'row', padding: 12, gap: 8, backgroundColor: '#fff' },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    color: '#0f172a',
  },
  addBtn: {
    backgroundColor: '#ef4444',
    borderRadius: 10,
    paddingHorizontal: 18,
    justifyContent: 'center',
    minWidth: 80,
    alignItems: 'center',
  },
  addBtnText: { color: '#fff', fontWeight: '700' },
  errorBox: { backgroundColor: '#fee2e2', padding: 10, marginHorizontal: 12, marginTop: 8, borderRadius: 8 },
  errorText: { color: '#b91c1c' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  thumb: { width: '100%', height: 180, backgroundColor: '#e2e8f0' },
  info: { padding: 12 },
  videoTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 6 },
  channel: { color: '#334155', marginBottom: 2 },
  meta: { color: '#64748b', fontSize: 13 },
  empty: { textAlign: 'center', color: '#64748b', marginTop: 40 },
});
