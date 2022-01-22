import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen, ScreenHeader, ScreenFlatList, Text } from '../components/UI';
import { Colors } from '../constants/Colors';

import BipData from '../assets/bip.json';

const ITEM_HEIGHT = 60;

// any - in reanimated broken generic types :(
const getItemLayout = (_: any, index: number) => ({
  offset: index * ITEM_HEIGHT, 
  length: ITEM_HEIGHT,
  index,
});

const keyExtractor = (item: any) => item; 

const RenderBipListItem = ({ item }: any) => (
  <View style={styles.itemContainer} key={`bip-item-${item}`}>
    <Text style={styles.itemText}>{item}</Text>
  </View>
);

export const FlatListExampleScreen = React.memo(() => {
  return (
    <Screen>
      <ScreenHeader title="Wallet" />
      <ScreenFlatList
        data={BipData}
        windowSize={16}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={60}
        initialNumToRender={20} 
        scrollEventThrottle={16}
        contentContainerStyle={styles.listStyle}
        keyExtractor={keyExtractor}
        renderItem={RenderBipListItem}
        getItemLayout={getItemLayout}
        withButtomDivider
      />
    </Screen>
  );
});

const styles = StyleSheet.create({
  listStyle: {
    backgroundColor: Colors.backgroundPrimary,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    paddingLeft: 16,
    justifyContent: 'center'
  },
  itemText: {
    color: '#FFF',
    fontSize: 20
  }
});
