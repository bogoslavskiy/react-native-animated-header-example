import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors, NavigatorTheme } from '../constants/Colors';

import { FlatListExampleScreen } from '../screens/FlatListExampleScreen';
import { ScrollViewExampleScreen } from '../screens/ScrollViewExampleScreen';

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
          title: 'FlatList',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="ScrollView"
        component={ScrollViewExampleScreen}
        options={{
          title: 'ScrollView',
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
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
