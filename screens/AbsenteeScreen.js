'use strict';
//***********************************************************
//*  AbsenteeScreen: Show the info URL for absentee voting  *
//***********************************************************

import React from 'react';
import {View, Text} from 'react-native';

const AbsenteeScreen = ({route, navigation}) => {
  var json_data = route.params.json_data;
  console.log('here 29');
  console.log(json_data);
  console.log('state here');
  console.log(json_data.state);

  var link_display_string =
    json_data.state[0].electionAdministrationBody.electionInfoUrl;
  console.log(link_display_string);

  return (
    <View>
      <Text>
        Here are some resources to help you find more information about
        abstentee voting!
      </Text>

      <Text>Abstentee info: {link_display_string}</Text>
    </View>
  );
};

export default AbsenteeScreen;
