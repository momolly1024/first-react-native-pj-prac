import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
let fcmUnsubscribe = null;
const TestComp = props => {
  const navigation = useNavigation();
  //   console.log(props);
  const {hello, setIndex} = props;
  //   const changePage = i => {
  //     setIndex(i);
  //   };
  useEffect(() => {
    messaging()
      .requestPermission()
      .then(authStatus => {
        console.log('APNs Status: ', authStatus);
        if (
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL
        ) {
          messaging()
            .getToken()
            .then(token => {
              console.log('messaging.getToken: ', token);
            });
          messaging().onTokenRefresh(token => {
            console.log('messaging.onTokenRefresh: ', token);
          });
          fcmUnsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('A new message just arrived. ', remoteMessage);
            Alert.alert(
              'A new FCM message arrived!',
              JSON.stringify(remoteMessage.data.screen_name),
              [
                {
                  text: 'OK',
                  onPress: navigation.navigate(remoteMessage.data.screen_name),
                },
              ],
              {cancelable: false},
            );
            // changePage(2);
            navigation.navigate(remoteMessage.data.screen_name);
          });
          messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
          });
        }
      })
      .catch(err => {
        console.log('messaging.requestPermission Error: ', err);
        throw err;
      });
  }, []);
  return (
    <View style={styles.TestComp}>
      <TouchableOpacity onPress={() => navigation.navigate(hello)}>
        <Text style={styles.alertText}>GO TO {hello}</Text>
      </TouchableOpacity>
    </View>
  );
};

const A123 = props => {
  const {name} = props;
  return (
    <View>
      <Text>1:{name}</Text>
      <TouchableOpacity
        onPress={() => Alert.alert('asd')}
        style={styles.alertBox}>
        <Text>ALERT</Text>
      </TouchableOpacity>
    </View>
  );
};
const data = [
  {name: 'QQQQ', id: '1'},
  {name: 'WWWW', id: '2'},
  {name: 'EEEE', id: '3'},
  {name: 'RRRR', id: '4'},
  {name: 'aaaa', id: '5'},
  {name: 'ssss', id: '6'},
  {name: 'dddd', id: '7'},
];
function SettingsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Settings Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '90%',
          flexWrap: 'wrap',
          //   height: 100,
          //   padding: 20,
        }}>
        {data.map(r => (
          <TestComp hello={r.name} key={r.id} />
        ))}
      </View>
    </View>
  );
}

function ProfileScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile Screen</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}
const SettingsStack = createNativeStackNavigator();

function CardItems(props) {
  const {setIndex} = props;

  return (
    <NavigationContainer>
      <SettingsStack.Navigator screenOptions={{headerShown: false}}>
        <SettingsStack.Screen name="First">
          {() => (
            <SettingsStack.Navigator>
              <SettingsStack.Screen name="Settings">
                {props => <SettingsScreen {...props} setIndex={setIndex} />}
              </SettingsStack.Screen>

              <SettingsStack.Screen name="Profile" component={ProfileScreen} />
              <SettingsStack.Screen name="A123" component={A123} />
              {data.map(r => (
                <SettingsStack.Screen name={r.name} key={r.id}>
                  {props => <A123 {...props} name={r.name} />}
                </SettingsStack.Screen>
              ))}
            </SettingsStack.Navigator>
          )}
        </SettingsStack.Screen>
      </SettingsStack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  TestComp: {
    fontSize: 20,
    width: 160,
    height: 120,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#aadafa',
    margin: 4,
    // flex: 1,
  },
  alertBox: {
    fontSize: 20,
    width: 90,
    height: 70,
    backgroundColor: '#aaffaa',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 150,
  },
  alertText: {
    fontSize: 30,
  },
});

export default CardItems;
