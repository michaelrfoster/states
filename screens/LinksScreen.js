'use strict';
//**********************************************************************
//*  LinksScreen: Show the election info URL (and maybe other links?)  *
//**********************************************************************

import React from 'react';
import {View, Text} from 'react-native';

const LinksScreen = ({route, navigation}) => {
  var json_data = route.params.json_data;

  var link_display_string =
    json_data.state[0].electionAdministrationBody.electionInfoUrl;

  return (
    <View>
      <Text>
        Here are some resources to help you find more information about the
        election!
      </Text>

      <Text>General election info: {link_display_string}</Text>
    </View>
  );
};

export default LinksScreen;
