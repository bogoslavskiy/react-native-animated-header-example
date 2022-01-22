import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Constants from 'expo-constants';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { isAndroid } from '../../constants/utils';
import { Colors } from '../../constants/Colors';
import { useScreen } from './Screen';
import { Text } from './Text';

interface ScreenHeaderProps {
  title: string;
}

const headerHeight = 70;
const maxStretch = -300;
const maxScale = 1.25;
const largeTitleHeight = 44;
const largeTitlePos = headerHeight - largeTitleHeight;

export const ScreenHeader = React.memo<ScreenHeaderProps>(({ title }) => {
  const { contentScrollY } = useScreen();
  const dimensions = useWindowDimensions();

  const titleStyle = useAnimatedStyle(() => ({
    width: dimensions.width,
    opacity: interpolate(
      contentScrollY.value,
      [8, 20],
      [0, 1],
      Extrapolate.CLAMP
    ),
    transform: [{ 
      translateY: interpolate(
        contentScrollY.value,
        [0, 20],
        [8, 0],
        Extrapolate.CLAMP
      )
    }]
  }));

  const largeTitleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      contentScrollY.value,
      [0, 8],
      [1, 0],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      contentScrollY.value,
      [0, maxStretch],
      [1, maxScale],
      Extrapolate.CLAMP
    );
    
    const heightScalingDiff = largeTitleHeight * scale / 2 - largeTitleHeight / 2;
    const widthScalingDiff = dimensions.width * scale / 2 - dimensions.width / 2;
    
    const offsetY = -contentScrollY.value / scale - heightScalingDiff + largeTitlePos;
    const offsetX = widthScalingDiff / scale;

    return {
      opacity,
      width: dimensions.width,
      height: largeTitleHeight,
      transform: [
        { scale },
        { translateX: offsetX },
        { translateY: offsetY },
      ]
    }
  });

  return (
    <>
      <Animated.View style={[styles.headerTitle,  styles.headerHeight, titleStyle]}>
        <Text style={styles.headerTitleText}>
          {title}
        </Text>
      </Animated.View>
      <View style={styles.headerHeight}>
        <Animated.View style={largeTitleStyle}>
          <Text style={styles.largeTitleText}>
            {title}
          </Text>
        </Animated.View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  headerHeight: {
    marginTop: Constants.statusBarHeight,
    height: headerHeight,
  },
  headerTitle: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',        
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.divider,
  },
  headerTitleText: {
    fontWeight: '700',
    color: Colors.text,
    fontSize: 20,
    lineHeight: 20,
  },
  largeTitleText: {
    color: Colors.text,
    fontSize: 34,
    fontWeight: '700',
    paddingHorizontal: 16,
    lineHeight: isAndroid ? 38 : 40
  },
});