import * as React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { useScreen } from './Screen';
import { ScreenBottomDivider, ScreenBottomDividerRef } from './ScreenBottomDivider';

type WithScreenScrollProp<T> = T & { 
  withButtomDivider?: boolean;
};

export function withScreenScroll<C = unknown, P = Record<string, unknown>>(
  Component: React.ComponentType<P>
): React.ForwardRefExoticComponent<React.PropsWithoutRef<WithScreenScrollProp<P>> & React.RefAttributes<C>> {
  
  const ForwardComponent = React.forwardRef<C, WithScreenScrollProp<P>>((props, ref) => {
    const { contentScrollHandler } = useScreen();
    const dividerRef = React.useRef<ScreenBottomDividerRef>(null);

    const handleLayout = (ev: LayoutChangeEvent) => {
      dividerRef.current?.setAreaHeight(ev.nativeEvent.layout.height);
    };

    const handleContentSizeChange = (width: number, height: number) => {
      dividerRef.current?.setContentHeight(height);
    };

    return (
      <>
        <Component 
          {...props} 
          ref={ref}
          scrollEventThrottle={16}
          onScroll={contentScrollHandler}
          {...props.withButtomDivider && {
            onLayout: handleLayout,
            onContentSizeChange: handleContentSizeChange
          }}
        />

        {props.withButtomDivider && <ScreenBottomDivider ref={dividerRef} />}
      </>
    );
  });

  ForwardComponent.displayName = Component.displayName || `withScreenScroll(${Component.name})`

  return ForwardComponent;
};