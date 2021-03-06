'use strict';
//**********************************************************************
//*  LinksScreen: Show the election info URL (and maybe other links?)  *
//**********************************************************************

import React from 'react';
import {View, Text, Linking} from 'react-native';

const LinksScreen = ({route, navigation}) => {
  var json_data = route.params.json_data;

 // var link_display_string =
 //   json_data.state[0].electionAdministrationBody.electionInfoUrl;

  return (
    <View
    style={{
                 flex: 1,
                 flexDirection: 'column',
                 justifyContent: 'space-evenly',
                 alignItems: 'center',
                 padding: 30,
               }}>
      <Text>
        Here are some links that can provide you with more information about the election.
      </Text>

      <Text style={{color: 'blue'}}
      onPress={() => Linking.openURL('https://vote.gov/ ')}>
      General election information</Text>


      <Text style={{color: 'blue'}}
      onPress={() => Linking.openURL('https://www.instagram.com/stelections/')}>
      STATES Elections Instagram Page</Text>
    </View>
  );
};

export default LinksScreen;
