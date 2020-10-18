'use strict';
//*****************************************************************
//*  PollingScreen: Get the polling station(s) and display them.  *
//*****************************************************************

import React from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';

const PollingScreen = ({route, navigation}) => {
  var json_data = route.params.json_data;
  const styles = route.params.styles;
  // Functions for FlatList
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  const renderItem = ({item}) => <Item title={item.title} />;

  var data = [];


  for (var i in json_data.earlyVoteSites)
  {
    var locations_strings = ""

    console.log('looping');
    console.log(i);

    locations_strings =
      locations_strings +
      '\nEarly Vote Location: ' +
      json_data.earlyVoteSites[i].address.locationName +
      '\n';
    locations_strings =
      locations_strings +
      'Address: ' +
      json_data.earlyVoteSites[i].address.line1 +
      ', ';
    if (json_data.earlyVoteSites[i].address.line2) {
      locations_strings =
        locations_strings + json_data.earlyVoteSites[i].address.line2;
    }
    if (json_data.earlyVoteSites[i].address.line3) {
      locations_strings =
        locations_strings + json_data.earlyVoteSites[i].address.line3;
    }
    locations_strings =
      locations_strings + json_data.earlyVoteSites[i].address.city + ', ';
    locations_strings =
      locations_strings + json_data.earlyVoteSites[i].address.state + ', ';
    locations_strings =
      locations_strings + json_data.earlyVoteSites[i].address.zip;

    if (json_data.earlyVoteSites[i].pollingHours)
    {
    locations_strings += "\nHours Open: ";
    locations_strings += json_data.earlyVoteSites[i].pollingHours;
    }



    var cur_location = {
      id: 'early' + i,
      title: locations_strings,
    };

    data.push(cur_location);
  }


  for (var i in json_data.pollingLocations) {
    var locations_strings = ""

    locations_strings =
      locations_strings +
      '\nPolling Location: ' +
      json_data.pollingLocations[i].address.locationName +
      '\n';
    locations_strings =
      locations_strings +
      'Address: ' +
      json_data.pollingLocations[i].address.line1 +
      ', ';
    if (json_data.pollingLocations[i].address.line2) {
      locations_strings =
        locations_strings + json_data.pollingLocations[i].address.line2;
    }
    if (json_data.pollingLocations[i].address.line3) {
      locations_strings =
        locations_strings + json_data.pollingLocations[i].address.line3;
    }
    locations_strings =
      locations_strings + json_data.pollingLocations[i].address.city + ', ';
    locations_strings =
      locations_strings + json_data.pollingLocations[i].address.state + ', ';
    locations_strings =
      locations_strings + json_data.pollingLocations[i].address.zip;

    if (json_data.pollingLocations[i].pollingHours)
    {
    locations_strings += "\nHours Open: ";
    locations_strings += json_data.pollingLocations[i].pollingHours;
    }



    var cur_location = {
      id: i,
      title: locations_strings,
    };

    data.push(cur_location);
  }

      if (locations_strings == null)
      {
       locations_strings = "It looks like the polling location data for your district is not yet available on the Google Civic API. You may still be able to find this information by checking the links on our Additional Election Resources Page or by going to https://vote.gov/";
       var cur_location = {id: 'none', title: locations_strings};
       data.push(cur_location);
      }


  return (

      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
  );
};

export default PollingScreen;
