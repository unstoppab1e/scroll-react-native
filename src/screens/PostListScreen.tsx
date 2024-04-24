import { View, Text, FlatList } from 'react-native';
import { useGetPostsQuery } from '../store/apiSlice';
import React, { useState } from 'react';

export const PostListScreen = () => {
  const [limit, setLimit] = useState(10);
  const [start, setStart] = useState(0);
  const {
    data: posts,
    isLoading,
    isFetching,
    refetch,
  } = useGetPostsQuery({ start: 0, limit: 10 });

  const handleRefresh = () => {
    setStart(0);
    refetch();
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      refreshing={isFetching}
      onRefresh={handleRefresh}
      contentContainerStyle={{
        paddingHorizontal: 16,
        flexGrow: 1,
        gap: 16,
      }}
      renderItem={({ item }) => (
        <View
          style={{
            backgroundColor: '#eee',
            padding: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ddd',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.title}</Text>
          <Text numberOfLines={3} style={{ fontSize: 14, marginTop: 16 }}>
            {item.body}
          </Text>
        </View>
      )}
    />
  );
};
