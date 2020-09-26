'use strict';
//*****************************************************************
//*  PollingScreen: Get the polling station(s) and display them.  *
//*****************************************************************

import React from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet} from 'react-native';

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
    paddingTop: 10,
  },

  header: {
    fontSize: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 14,
    paddingTop: 10,
  },
});

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const renderItem = ({item}) => <Item title={item.title} />;

const PollingScreen = ({route, navigation}) => {
  var json_data = route.params.json_data;

  var data = [];

  for (var i in json_data.pollingLocations) {
    console.log(i);
    var locations_strings = '';

    locations_strings =
      locations_strings +
      'Location: ' +
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

    var cur_location = {
      id: i,
      title: locations_strings,
    };

    data.push(cur_location);
  }

  return (
    <>
      <View>
        <Text>Here is a list of nearby polling stations</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </>
  );
};

export default PollingScreen;
