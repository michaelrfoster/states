'use strict';
//******************************************************
//*  SelectionScreen: Holds buttons to other screens.  *
//******************************************************

import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import * as fake_data from '../fake_data.json';
import {secret_key} from '../secret/secret_key.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247, 247, 247, 1.0)',
  },

  item: {
    fontSize: 48,
  },

  header: {
    fontSize: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 14,
    paddingTop: 0,
  },
});

// eslint-disable-next-line no-unused-vars
function make_google_civic_api_call(address_val, callback) {
  // var fetch_string = 'https://www.googleapis.com/civicinfo/v2/voterinfo?address=5327 W Keefe Ave Milwaukee, Wisconsin, 53216?electionId=5009';
  // var fetch_string = 'https://www.googleapis.com/civicinfo/v2/elections';
  var fetch_string = 'https://www.googleapis.com/civicinfo/v2/voterinfo';
  fetch_string += '?address=' + address_val;
  fetch_string += '&electionId=' + '4953';
  fetch_string += '&key=' + secret_key;
  console.log('test');
  console.log(fetch_string);
  fetch(fetch_string, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log('done with json request');
      console.log(responseJson);
      /* console.log('object');
         const json_obj = JSON.parse(responseJson);
         console.log('state after stringify');
         console.log(responseJson.state);
         var stringified = JSON.stringify(responseJson);
         console.log(stringified);

         return stringified;*/
      callback(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
}

function make_fake_data_call(address_val, callback) {
  console.log('you asked for fake data');
  callback(fake_data);
}

const SelectionScreen = ({route, navigation}) => {
  var address_val = route.params.address_val;
  console.log('here 27');
  console.log(address_val);

  var json_data;

  /*make_google_civic_api_call(address_val, function(response) {
      json_data = response;
    });*/

  make_fake_data_call(address_val, response => {
    json_data = response;
  });

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <Text>Please select an option to continue.</Text>
      <Button
        title="See who is on my ballot"
        onPress={() => {
          navigation.navigate('CandidatesScreen', {
            json_data: json_data,
            styles: styles,
          });
        }}
      />
      <Button
        title="View polling stations"
        onPress={() => {
          navigation.navigate('PollingScreen', {
            json_data: json_data,
            styles: styles,
          });
        }}
      />
      <Button
        title="Additional election resources"
        onPress={() => {
          console.log('not here');
          navigation.navigate('LinksScreen', {json_data: json_data});
        }}
      />
      <Button
        title="Change Address"
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}
      />
    </View>
  );
};

export default SelectionScreen;
