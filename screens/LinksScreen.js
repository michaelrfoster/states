'use strict';
//**********************************************************************
//*  LinksScreen: Show the election info URL (and maybe other links?)  *
//**********************************************************************

import React from 'react';
import {View, Text} from 'react-native';

const LinksScreen = ({route, navigation}) => {
  var link_info = route.params.link_info;
  console.log('here 29');
  console.log(link_info);
  console.log('state here');
  console.log(link_info.state);

  // var link_display_string = link_info.state.electionAdministrationBody;
  var link_display_string =
    link_info.state[0].electionAdministrationBody.electionInfoUrl;
  console.log(link_display_string);
  // console.log('abs');
  // console.log(link_info.state[0].electionAdministrationBody.absenteeVotingInfoUrl);
  // console.log(link_info.state[0].electionAdministrationBody);

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
