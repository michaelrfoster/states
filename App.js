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

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomeScreen} />

        <Stack.Screen name="Select An Option" component={SelectionScreen} />

        <Stack.Screen name="Election Resources" component={LinksScreen} />

        <Stack.Screen name="Voting Locations" component={PollingScreen} />

        <Stack.Screen name="Candidate List" component={CandidatesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
