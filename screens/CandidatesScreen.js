'use strict';
//*************************************************************
//*  CandidatesScreen: Displays the candidates on the ballot  *
//*************************************************************

import React from 'react';
//import styles from '../App.js'; won't work for me
import {View, Text, SafeAreaView, SectionList, StyleSheet} from 'react-native';

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

// Takes in text and returns component with proper formatting
const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const CandidatesScreen = ({route, navigation}) => {
  var json_data = route.params.json_data;
  var contests = [];
  for (var i = 0; i < json_data.contests.length; i++) {
    var candidate_names = [];
    for (var j = 0; j < json_data.contests[i].candidates.length; j++) {
      var info_string = '';
      info_string += json_data.contests[i].candidates[j].name;
      info_string += ' - ';
      info_string += json_data.contests[i].candidates[j].party;
      candidate_names.push(info_string);
    }
    var cur_contest = {
      title: json_data.contests[i].office,
      data: candidate_names,
    };
    contests.push(cur_contest);
  }

  return (
    <>
      <View>
        <Text>Here is a list of the candidates on your ballot</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={contests}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Item title={item} />}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default CandidatesScreen;
