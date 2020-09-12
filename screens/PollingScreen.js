'use strict';
//*****************************************************************
//*  PollingScreen: Get the polling station(s) and display them.  *
//*****************************************************************

import React from 'react';
import {View, Text} from 'react-native';

const PollingScreen = ({route, navigation}) => {
  var locations = route.params.locations_strings;

  console.log('all here!');

  console.log(locations);
  return (
    <View>
      <Text>Here is a list of nearby polling stations</Text>
      <Text>{locations}</Text>
    </View>
  );
};

export default PollingScreen;
