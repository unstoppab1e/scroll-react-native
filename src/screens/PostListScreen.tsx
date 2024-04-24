import { View, Text, FlatList, ActivityIndicator } from 'react-native';
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
  } = useGetPostsQuery({ limit: 10, start });

  const handleRefresh = () => {
    setStart(0);
    refetch();
  };

  const handleEndReached = () => {
    if (posts?.length === start + 10) {
      setStart((prev) => prev + 10);
    }
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
      onEndReached={handleEndReached}
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
      ListFooterComponent={() => (
        <View>{isFetching && <ActivityIndicator size='small' />}</View>
      )}
    />
  );
};
