import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenHeader, Screen, ScreenScrollView, Text } from '../components/UI';
import { Colors } from '../constants/Colors';

export const ScrollViewExampleScreen = React.memo(() => (
  <Screen>
    <ScreenHeader title="ScrollView" />
    <ScreenScrollView 
      contentContainerStyle={styles.scrollView}
      withButtomDivider
    >
      {Array(10).fill(0).map((_, index) => (
        <View key={`item-${index}`} style={styles.item}>
          <Text style={styles.itemText}>{index}</Text>
        </View>
      ))}
    </ScreenScrollView>
  </Screen>
));

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 16
  },
  item: {
    height: 80,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    color: Colors.text,
    fontSize: 17
  }
});
