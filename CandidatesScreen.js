'use strict';

//*************************************************************
//*  CandidatesScreen: Displays the candidates on the ballot  *
//*************************************************************

import React from 'react';
import {View, Text} from 'react-native';

const CandidatesScreen = ({route, navigation}) => {
  var candidate_strings = route.params.candidate_strings;
  console.log('here 22');
  console.log(candidate_strings);
  return (
    <View>
      <Text>Here is a list of the candidates on your ballot</Text>
      <Text>{candidate_strings}</Text>
    </View>
  );
};

export default CandidatesScreen;
