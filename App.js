'use strict';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import HomeScreen from './screens/HomeScreen.js';
import CandidatesScreen from './screens/CandidatesScreen.js';
import SelectionScreen from './screens/SelectionScreen.js';
import PollingScreen from './screens/PollingScreen.js';
import LinksScreen from './screens/LinksScreen.js';
import AbsenteeScreen from './screens/AbsenteeScreen.js';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

        <Stack.Screen name="SelectionScreen" component={SelectionScreen} />

        <Stack.Screen name="LinksScreen" component={LinksScreen} />

        <Stack.Screen name="AbstenteeScreen" component={AbsenteeScreen} />

        <Stack.Screen name="PollingScreen" component={PollingScreen} />

        <Stack.Screen name="CandidatesScreen" component={CandidatesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
