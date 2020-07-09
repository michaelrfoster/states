import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Swipe from the left edge or press the button</Text>
      <Button onPress={() => navigation.toggleDrawer()} title="Open drawer" />
    </View>
  );
}

function DetailsScreen({navigation, route}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{route.name}</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Somebody once told me" component={DetailsScreen} />
        <Drawer.Screen name="The world is gonna roll me" component={DetailsScreen} />
        <Drawer.Screen name="I ain't the sharpest tool in the shed" component={DetailsScreen} />
        <Drawer.Screen name="She was looking kind of dumb" component={DetailsScreen} />
        <Drawer.Screen name="With her finger and her thumb" component={DetailsScreen} />
        <Drawer.Screen name="In the shape of an &quot;L&quot; on her forehead" component={DetailsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}