import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
//import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import * as secret_key from './secret/secret_key.js';
console.log('secret');
//console.log(secret_key.secret_key);

//import _jquery from 'jquery';
import $ from 'jquery';
//import jquery.default.getJSON from 'jquery';
// import {map_data} from './shapefile_data/topo_four.js';
//const Container = Styled.View '
//flex: 1;'
//;



//const GoogleMap = () => {
//return (<Container>
//<MapView style={{flex: 1}} provider = {PROVIDER_GOOGLE} />
//<Container>);
//};

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  PermissionsAndroid
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const my_styles = StyleSheet.create({
map: {
...StyleSheet.absoluteFillObject,
},
});



function load_map_data ()
{
  console.log("no errors yet");
 // console.log()
//  $.getJSON("shapefile_data/topo_four.json", function (data) {
//  console.log("here 99");
  //$.each(data, function (key, val) {
  //console.log("here inner 44");
  //});

//  });
}

function get_location ()
{
//if (hasLocationPermission)
//{
Geolocation.getCurrentPosition(
    (position) => {
    console.log(position);
    },
    (error) => {
        console.log(error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 1000}
    );
//    }

}

function buttonPressed ()
{
console.log('button pressed');
}

async function request_location_permission() {
try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
    title: "Give location permission",
    message: "Let us know your location, so we can best help you!",
    buttonNegative: "Cancel",
    buttonPositive: "OK"
    }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED)
    {
    console.log("granted");

        console.log("we are here");
        get_location();
    }
    else
    {
    console.log("denied");
    }
    }
    catch (err) { console.warn(err); }



};

function make_google_civic_api_call (address_val, callback)
{
//var fetch_string = 'https://www.googleapis.com/civicinfo/v2/voterinfo?address=5327 W Keefe Ave Milwaukee, Wisconsin, 53216?electionId=5009';
//var fetch_string = 'https://www.googleapis.com/civicinfo/v2/elections';
var fetch_string = 'https://www.googleapis.com/civicinfo/v2/voterinfo';
fetch_string = fetch_string + '?address=' + address_val;
fetch_string = fetch_string + '&electionId=' + '4953';
fetch_string = fetch_string + '&key=' + secret_key.secret_key;
console.log('test');
console.log(fetch_string);
fetch(fetch_string, {
method: 'GET'
})
.then((response) => response.json())
.then((responseJson) => {
console.log('done with json request');
console.log(responseJson);
//console.log('object');
//const json_obj = JSON.parse(responseJson);
//console.log('state after stringify');
//console.log(responseJson.state);
//var stringified = JSON.stringify(responseJson);
//console.log(stringified);

//return stringified;
callback(responseJson);

})
.catch((error) => {
console.error(error);
})
}



const HomeScreen = ({ navigation }) => {

//const [value, onChangeText] = React.useState('UselessPlaceholder');

const [value, onChangeText] = React.useState('109 Noble Dr, Belle Chasse, LA, 70037');


    return (


    <>

        <TextInput
        style = {{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder = 'Enter address here'
        onChangeText = {text => onChangeText(text)}
        value = {value}
        id = 'address_field'

        />

        <Button
        //onPress = {this._buttonPressed}
        onPress = {() => {
    //    console.log('the button has been pressed.');
    //    console.log(value);
        navigation.navigate('SelectionScreen', {address_val: value});
        }}
        title='Go'
        />

        </>


    );


};
const SelectionScreen = ({route, navigation}) => {

const [json_value, on_request] = React.useState('testing');
//response_json = '';


    var address_val = route.params;
    address_val = address_val.address_val;
    console.log('here 27');
    console.log(address_val);

    var json_data = null;


   // make_google_civic_api_call.then(json_value => on_request(json_value))
    // response = await make_google_civic_api_call(address_val);
   //  const response_hook = React.useState('error');
   make_google_civic_api_call(address_val, function (response)
   {
   console.log('plz plz');
   console.log(response);
    () => on_request(json_value = response);
    console.log('wombat');
    console.log(json_value);

    json_data = response;
   }
   );

  //   console.log('here 999');
  //   console.log(response);
  //  console.log(response_json);


    return (


 //   console.log('here 28000'),
 //   console.log(response.state.electionAdministrationBody),
    <>

    <Text>Testing</Text>
    <Button
    title='See who is on my ballot'
    />
    <Button
        title='View polling stations'
        onPress = {() => {

        var location_strings = '';

        for (const i in json_data.pollingLocations)
        {
        console.log('loop');
        console.log(i);
        locations_strings = location_strings + 'Location: ' + json_data.pollingLocations[i].address.locationName + '\n';
        locations_strings = locations_strings + 'Address: ' + json_data.pollingLocations[i].address.line1 + ', ';
      //  locations_strings = locations_strings + json_data.pollingLocations[i].address.line2;
      //  locations_strings = locations_strings + json_data.pollingLocations[i].address.line3;
        locations_strings = locations_strings +  json_data.pollingLocations[i].address.city + ', ';
        locations_strings = locations_strings +  json_data.pollingLocations[i].address.state + ', ';
        locations_strings = locations_strings +  json_data.pollingLocations[i].address.zip;



        }

        console.log('9494');
        console.log(locations_strings);


                       navigation.navigate('PollingStations', {locations_strings: locations_strings});
                        }}
                />

        <Button
        title = 'Additional election resources'
        onPress = {() => {
        console.log('not here');
   //     console.log(response_hook);
   //     console.log(response);
               navigation.navigate('LinksScreen', {link_info: json_data});
                }}
        />


    </>

    );
};

const PollingStations = ({route, navigation}) =>
{
var locations = route.params.locations_strings;

console.log('all here!');




console.log(locations);
return (

<>
<Text>Here is a list of nearby polling stations</Text>
<Text>{locations}</Text>

</>

)
}

const LinksScreen = ({route, navigation}) =>
{
var link_info = route.params.link_info;
console.log('here 29');
console.log(link_info);
console.log('state here');
console.log(link_info.state);

//var link_display_string = link_info.state.electionAdministrationBody;
var link_display_string = link_info.state[0].electionAdministrationBody.electionInfoUrl;
console.log(link_display_string);
//console.log('abs');
//console.log(link_info.state[0].electionAdministrationBody.absenteeVotingInfoUrl);
//console.log(link_info.state[0].electionAdministrationBody);

return (
<>
<Text>Here are some resources to help you find more information about the election!</Text>

<Text>General election info: {link_display_string}</Text>
</>

)

}

const Stack = createStackNavigator();

    request_location_permission();


    console.log("tag9999999994444444");
    get_location();

    console.log("new stuff");
    load_map_data();


const App: () => React$Node = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>

        <Stack.Screen
        name='Home'
        component={HomeScreen}
        />

        <Stack.Screen
        name='SelectionScreen'
        component = {SelectionScreen}
        />

        <Stack.Screen
        name='LinksScreen'
        component = {LinksScreen}
        />

        <Stack.Screen
        name = 'PollingStations'
        component = {PollingStations}
        />


    </Stack.Navigator>
  </NavigationContainer>



  //  <>

  //  <MapView
  //  style={my_styles.map}
  //    initialRegion = {{
  //    latitude: 37.78825,
  //    longitude: -122.4324,
  //    latitudeDelta: 0.0922,
  //    longitudeDelta: 0.0421,
  //    }} />

  //  <div>
//    <>

 //   <TextInput
 //   style = {{height: 40, borderColor: 'gray', borderWidth: 1}}
 //   value = {'Enter address here'}
 //   />

 //   <Button
    //onPress = {this._buttonPressed}
//    onPress = {() => {
//    console.log('the button has been pressed.');
//    }}
//    title='Go'
//    />

 //   </>

  //  </div>

  //    <StatusBar barStyle="dark-content" />
  //    <SafeAreaView>
  //      <ScrollView
  //        contentInsetAdjustmentBehavior="automatic"
  //        style={styles.scrollView}>
  //        <Header />
  //        {global.HermesInternal == null ? null : (
//            <View style={styles.engine}>
//              <Text style={styles.footer}>Engine: Hermes</Text>
//            </View>
//          )}
//          <View style={styles.body}>
//            <View style={styles.sectionContainer}>
//              <Text style={styles.sectionTitle}>Step One</Text>
//              <Text style={styles.sectionDescription}>
//                Edit <Text style={styles.highlight}>App.js</Text> to change this
//                screen and then come back to see your edits. Hi I did something! lol
//              </Text>
//            </View>
//            <View style={styles.sectionContainer}>
//              <Text style={styles.sectionTitle}>See Your Changes</Text>
//              <Text style={styles.sectionDescription}>
//                <ReloadInstructions />
//              </Text>
//            </View>
//            <View style={styles.sectionContainer}>
//              <Text style={styles.sectionTitle}>Debug</Text>
//              <Text style={styles.sectionDescription}>
//                <DebugInstructions />
//              </Text>
//            </View>
//            <View style={styles.sectionContainer}>
//              <Text style={styles.sectionTitle}>Learn More</Text>
//              <Text style={styles.sectionDescription}>
//                Read the docs to discover what to do next:
//              </Text>
//            </View>
//            <LearnMoreLinks />
//          </View>
//        </ScrollView>
//      </SafeAreaView>
//   </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
