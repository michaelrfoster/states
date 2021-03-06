'use strict';
//*************************************************************
//*  CandidatesScreen: Displays the candidates on the ballot  *
//*************************************************************

import React from 'react';
import {View, Text, SafeAreaView, SectionList} from 'react-native';

const CandidatesScreen = ({route, navigation}) => {
  const styles = route.params.styles;
  // Item renderer for SectionList
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  var json_data = route.params.json_data;
  var contests = [];
  var displayed_string = ""

   if (json_data.contests != null)
   {
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

  }
  else
  {
  displayed_string = "It looks like the candidate data for your district is not yet available on the Google Civic API. You may still be able to find this information by checking the links on our Additional Election Resources Page or by going to https://vote.gov/"
  }

  return (
    <>
      <View>
        <Text>{displayed_string}</Text>
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
