/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
'use strict';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import {secret_key} from './secret/secret_key.js';
console.log('key=' + secret_key);

import * as fake_data from './fake_data.json';
console.log('fake_data=', fake_data);

import HomeScreen from './HomeScreen.js';
import CandidatesScreen from './CandidatesScreen.js';

// eslint-disable-next-line no-unused-vars
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
    fontSize: 24,
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

//******************************************************
//*  SelectionScreen: Holds buttons to other screens.  *
//******************************************************

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
          // console.log('not implemented');
          var candidate_strings = '';

          for (var i in json_data.contests) {
            console.log('candidate loop');
            console.log(i);
            console.log(json_data.contests[i]);
            console.log(json_data.contests[i].candidates);

            candidate_strings =
              candidate_strings +
              'Office: ' +
              json_data.contests[i].office +
              '\n';

            for (var j in json_data.contests[i].candidates) {
              candidate_strings =
                candidate_strings + json_data.contests[i].candidates[j].name;
              candidate_strings =
                candidate_strings +
                ' - ' +
                json_data.contests[i].candidates[j].party +
                '\n';

              console.log('here77');
              console.log(json_data.contests[i].candidates[j].party);
            }
          }

          //    }

          navigation.navigate('CandidatesScreen', {
            candidate_strings: candidate_strings,
          });
        }}
      />
      <Button
        title="View polling stations"
        onPress={() => {
          var location_strings = '';

          for (var i in json_data.pollingLocations) {
            console.log('loop');
            console.log(i);
            var locations_strings =
              location_strings +
              'Location: ' +
              json_data.pollingLocations[i].address.locationName +
              '\n';
            locations_strings =
              locations_strings +
              'Address: ' +
              json_data.pollingLocations[i].address.line1 +
              ', ';
            // locations_strings = locations_strings + json_data.pollingLocations[i].address.line2;
            // locations_strings = locations_strings + json_data.pollingLocations[i].address.line3;
            locations_strings =
              locations_strings +
              json_data.pollingLocations[i].address.city +
              ', ';
            locations_strings =
              locations_strings +
              json_data.pollingLocations[i].address.state +
              ', ';
            locations_strings =
              locations_strings + json_data.pollingLocations[i].address.zip;
          }

          console.log('9494');
          console.log(locations_strings);

          navigation.navigate('PollingScreen', {
            locations_strings: locations_strings,
          });
        }}
      />

      <Button
        title="Additional election resources"
        onPress={() => {
          console.log('not here');
          navigation.navigate('LinksScreen', {link_info: json_data});
        }}
      />
      <Button
        title="Abstentee voting resources"
        onPress={() => {
          navigation.navigate('AbstenteeScreen', {link_info: json_data});
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

//*****************************************************************
//*  PollingScreen: Get the polling station(s) and display them.  *
//*****************************************************************

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

//**********************************************************************
//*  LinksScreen: Show the election info URL (and maybe other links?)  *
//**********************************************************************

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

const AbstenteeScreen = ({route, navigation}) => {
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
        Here are some resources to help you find more information about abstentee voting!
      </Text>

      <Text>Abstentee info: {link_display_string}</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

        <Stack.Screen name="SelectionScreen" component={SelectionScreen} />

        <Stack.Screen name="LinksScreen" component={LinksScreen} />

        <Stack.Screen name="AbstenteeScreen" component={AbstenteeScreen} />

        <Stack.Screen name="PollingScreen" component={PollingScreen} />

        <Stack.Screen name="CandidatesScreen" component={CandidatesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
