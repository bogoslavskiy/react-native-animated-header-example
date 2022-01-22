import * as React from 'react';
import { View, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

type ScreenContext = {
  contentScrollY: Animated.SharedValue<number>;
  contentScrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
}

const ScreenContext = React.createContext<ScreenContext | null>(null);

export const Screen = React.memo(({ children }) => {
  const contentScrollY = useSharedValue(0);
  const contentScrollHandler = useAnimatedScrollHandler((event) => {
    contentScrollY.value = event.contentOffset.y;
  });

  const contextValue = { contentScrollY, contentScrollHandler };

  return (
    <ScreenContext.Provider value={contextValue}>
      <View style={styles.container}>
        {children}
      </View>
    </ScreenContext.Provider>
  );
});

export const useScreen = () => {
  const ctx = React.useContext(ScreenContext);

  if (!ctx) {
    throw new Error("Couldn't find a ScreenContext. Have you wrapped 'Screen' component?");
  } 

  return ctx;
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});