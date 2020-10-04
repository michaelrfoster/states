'use strict';
//**********************************************************************
//*  LinksScreen: Show the election info URL (and maybe other links?)  *
//**********************************************************************

import React from 'react';
import {View, Text, Linking} from 'react-native';

const LinksScreen = ({route, navigation}) => {
  var json_data = route.params.json_data;

  var link_display_string =
    json_data.state[0].electionAdministrationBody.electionInfoUrl;

  return (
    <View>
      <Text>
        Here is a link to a website that will help you register to vote and show you more information about the election.
      </Text>

      <Text style={{color: 'blue'}}
      onPress={() => Linking.openURL('https://vote.gov/ ')}>
      General election information</Text>
    </View>
  );
};

export default LinksScreen;
