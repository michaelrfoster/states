'use strict';
//****************************************************************************************************************************************
//*  HomeScreen: Get the address from the user. Uses the address to get information from API and pass that on for other screens to use.  *
//****************************************************************************************************************************************

import React from 'react';
import {View, TextInput, Button, Text, Linking} from 'react-native';

import {secret_key} from '../secret/secret_key.js';


import {Picker} from '@react-native-picker/picker';

//import RNPickerSelect from 'react-native-picker-select';



  function get_elections(callback) {
    // var fetch_string = 'https://www.googleapis.com/civicinfo/v2/voterinfo?address=5327 W Keefe Ave Milwaukee, Wisconsin, 53216?electionId=5009';
    // var fetch_string = 'https://www.googleapis.com/civicinfo/v2/elections';
    var fetch_string = 'https://www.googleapis.com/civicinfo/v2/elections';
 //   fetch_string += '?address=' + address_val;
 //   fetch_string += '&electionId=' + '7000';
    fetch_string += '?key=' + secret_key;

    fetch(fetch_string, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {

      console.log(responseJson);

        callback(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }
const HomeScreen = ({navigation}) => {

  const [value, onChangeText] = React.useState(
    'eg. 1234 Sample St. SampleTown LA 98765',

  );

var arr = 0;


    get_elections(function(response) {
        var json_data = response;

        arr = json_data.elections.slice(1, json_data.len);


    console.log("FINAL DATA",json_data);



  console.log("arr", arr);

   //    test = arr[0].name;

     //    console.log("test", test);



      });


       //   const [elections, changeElections] = React.useState(arr);





  return (



    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
      }}>



          <Picker>
          <Picker.Item label="TEST" value="test" />
          <Picker.Item label="2" value="3" />
          </Picker>


      <Text>
        Welcome to the STATES Election App. This app is designed to give you
        information about voting in the upcoming election. {'\n\n'}
        If you are using this app for the first time, please read our
              <Text style={{color: 'blue'}}
             onPress={() => Linking.openURL('https://sites.google.com/view/stateselectionspolicy/')}>
              {' '}Privacy Policy </Text>
        Which contains important information about our data usage and disclaimers. {'\n\n'}
        To continue, please enter the address where you are registered to vote.
        If you are not yet registered to vote, enter the address where you plan
        to register in.
      </Text>


      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder="Enter address here"
        onChangeText={text => onChangeText(text)}
        value={value}
        id="address_field"
      />

      <Button
        onPress={() => {
          navigation.navigate('Select An Option', {address_val: value});
        }}
        title="Go"
      />
    </View>
  );
};

export default HomeScreen;
