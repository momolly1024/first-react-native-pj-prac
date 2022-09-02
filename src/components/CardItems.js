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

const TestComp = props => {
  const navigation = useNavigation();
  const {hello, cardPage} = props;

  useEffect(() => {
    if (cardPage) {
      navigation.navigate(cardPage);
      console.log('TestComp-----', cardPage);
    }
  }, [cardPage]);

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
function SettingsScreen(props) {
  const navigation = useNavigation();
  const {cardPage} = props;

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
          <TestComp hello={r.name} key={r.id} cardPage={cardPage} />
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
  const {cardPage} = props;

  return (
    <NavigationContainer>
      <SettingsStack.Navigator screenOptions={{headerShown: false}}>
        <SettingsStack.Screen name="First">
          {() => (
            <SettingsStack.Navigator>
              <SettingsStack.Screen name="Settings">
                {props => <SettingsScreen {...props} cardPage={cardPage} />}
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
