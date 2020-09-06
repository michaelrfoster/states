'use strict';

//****************************************************************************************************************************************
//*  HomeScreen: Get the address from the user. Uses the address to get information from API and pass that on for other screens to use.  *
//****************************************************************************************************************************************

import React from 'react';
import {View, TextInput, Button} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [value, onChangeText] = React.useState(
    '109 Noble Dr, Belle Chasse, LA, 70037',
  );

  return (
    <View>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder="Enter address here"
        onChangeText={text => onChangeText(text)}
        value={value}
        id="address_field"
      />

      <Button
        onPress={() => {
          navigation.navigate('SelectionScreen', {address_val: value});
        }}
        title="Go"
      />
    </View>
  );
};

export default HomeScreen;
