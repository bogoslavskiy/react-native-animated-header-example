import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors, NavigatorTheme } from '../constants/Colors';
import{ Text } from '../components/UI';

import { FlatListExampleScreen } from '../screens/FlatListExampleScreen';
import { ScrollViewExampleScreen } from '../screens/ScrollViewExampleScreen';
import { isAndroid } from '../constants/utils';

export default function Navigation() {
  return (
    <NavigationContainer theme={NavigatorTheme} >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarStyle: {
          elevation: 0
        },
        tabBarActiveTintColor: Colors.tint,
        headerShown: false,
      }}>
      <BottomTab.Screen
        name="FlatList"
        component={FlatListExampleScreen}
        
        options={() => ({
          tabBarLabel: ({ color }) => <TabBarLabel title="FlatList" color={color} />,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="ScrollView"
        component={ScrollViewExampleScreen}
        options={{
          tabBarLabel: ({ color }) => <TabBarLabel title="ScrollView" color={color} />,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return (
    <FontAwesome 
      size={isAndroid ? 26 :  30} 
      style={{ marginBottom: isAndroid ? 0 : -3 }} 
      {...props} 
    />
  );
}

function TabBarLabel(props: {
  color: string;
  title: string
}) {
  return (
    <Text 
      style={{ 
        color: props.color,
        position: 'relative',
        top: isAndroid ? 0 : 4
      }}
    >
      {props.title}
    </Text>
  );
}