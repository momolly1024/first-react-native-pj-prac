// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React, {useEffect, useState} from 'react';
// import type {Node} from 'react';
// import {BottomNavigation} from 'react-native-paper';
// import Mqtt from './src/Mqtt/Mqtt';
// import Notify from './src/Notify/Notify';

// import TestRoute from './src/components/TestRoute';
// import FetchData from './src/components/FetchData';
// import RecentsRoute from './src/components/RecentsRoute';
// import Main from './src/Main';
// import TodoList from './src/todoList/TodoList';

// const App: () => Node = () => {
//   const [index, setIndex] = useState(0);
//   const [testPassProps, setTestPassProps] = useState('HELLO ~~~');
//   const [routes] = useState([
//     {key: 'FetchData', title: 'FetchData', icon: 'gift'},
//     // {key: 'recents', title: 'Recents', icon: 'history'},
//     // {key: 'TestRoute', title: 'TestRoute', icon: 'github'},
//     {key: 'main', title: 'Main', icon: 'github'},
//     {key: 'mqtt', title: 'MQTT', icon: 'lock'},
//     {key: 'notify', title: 'notify', icon: 'lock'},
//     {key: 'todoList', title: 'todoList', icon: 'map'},
//   ]);
//   useEffect(() => {
//     setTestPassProps('SOMETHING...');
//   }, []);
//   const renderScene = BottomNavigation.SceneMap({
//     FetchData: FetchData,
//     // recents: RecentsRoute,
//     // TestRoute: TestRoute,
//     main: Main,
//     mqtt: Mqtt,
//     notify: () => <Notify test={testPassProps} />,
//     todoList: TodoList,
//   });

//   return (
//     <BottomNavigation
//       navigationState={{index, routes}}
//       onIndexChange={setIndex}
//       renderScene={renderScene}
//     />
//   );
// };

// export default App;

import React from 'react';
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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';

const TestComp = props => {
  const navigation = useNavigation();
  console.log(props);
  const {hello} = props;
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

const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="First">
          {() => (
            <SettingsStack.Navigator>
              <SettingsStack.Screen
                name="Settings"
                component={SettingsScreen}
              />
              <SettingsStack.Screen name="Profile" component={ProfileScreen} />
              <SettingsStack.Screen name="A123" component={A123} />
              {data.map(r => (
                <SettingsStack.Screen name={r.name} key={r.id}>
                  {props => <A123 {...props} name={r.name} />}
                </SettingsStack.Screen>
              ))}
            </SettingsStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
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
export default App;
