import * as React from 'react';
import { Text as NativeText, TextProps as NativeTextProps, StyleSheet, TextStyle as NativeTextStyle } from 'react-native';

type SupportedFontWeight = '400' | '500' | '700';

const fontWeights: { [key in SupportedFontWeight]: string } = {
  '400': 'EuclidCircularA-Regular',
  '500': 'EuclidCircularA-Medium',
  '700': 'EuclidCircularA-Bold'
};

export type TextStyle = Omit<NativeTextStyle, 'fontWeight'> & {
  fontWeight?: SupportedFontWeight;
};

export type TextProps = NativeTextProps & { 
  style?: TextStyle;
};

export const Text = React.memo<TextProps>((props) => {
  const style = StyleSheet.flatten<TextStyle>(props.style) ?? {};
  const fontFamily = fontWeights[style?.['fontWeight']  ?? '400'];

  return (
    <NativeText 
      {...props} 
      allowFontScaling={false} 
      style={[style, { fontFamily }]} 
    />
  );
});
