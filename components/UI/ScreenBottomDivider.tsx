import * as React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';
import { useScreen } from './Screen';

export type ScreenBottomDividerRef = {
  setAreaHeight: (height: number) => void;
  setContentHeight: (height: number) => void;
}

export const ScreenBottomDivider = React.forwardRef<ScreenBottomDividerRef>((_, ref) => {
  const { contentScrollY } = useScreen();
  const [contentHeight, setContentHeight] = React.useState(0);
  const [areaHeight, setAreaHeight] = React.useState(0);

  React.useImperativeHandle(ref, () => ({
    setContentHeight: (height) => {
      setContentHeight(height);
    },
    setAreaHeight: (height) => {
      setAreaHeight(height);
    }
  }));

  const endContentHeight = contentHeight - areaHeight;
  const dividerStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        contentScrollY.value,
        [endContentHeight - 3, endContentHeight],
        [1, 0],
        Extrapolate.CLAMP
      )}), 
    [contentHeight, areaHeight]
  );

  return <Animated.View style={[styles.container, dividerStyle]} />
});

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.divider,
  }
});