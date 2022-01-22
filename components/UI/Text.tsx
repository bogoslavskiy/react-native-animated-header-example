import * as React from 'react';
import { Text as NativeText, TextProps } from 'react-native';

export const Text = React.memo<TextProps>((props) => (
  <NativeText {...props} allowFontScaling={false} />
));