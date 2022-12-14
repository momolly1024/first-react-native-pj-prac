// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {BottomNavigation} from 'react-native-paper';
import Mqtt from './src/Mqtt/Mqtt';
import Notify from './src/Notify/Notify';
import TestRoute from './src/components/TestRoute';
import FetchData from './src/components/FetchData';
import RecentsRoute from './src/components/RecentsRoute';
import Main from './src/Main';
import TodoList from './src/todoList/TodoList';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import CardItems from './src/components/CardItems';
import messaging from '@react-native-firebase/messaging';
let fcmUnsubscribe = null;
const App: () => Node = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'notify', title: 'CardItems', icon: 'lock'},
    {key: 'FetchData', title: 'FetchData', icon: 'gift'},
    // {key: 'recents', title: 'Recents', icon: 'history'},
    // {key: 'TestRoute', title: 'TestRoute', icon: 'github'},
    {key: 'main', title: 'Main', icon: 'github'},
    {key: 'mqtt', title: 'MQTT', icon: 'lock'},
    {key: 'todoList', title: 'todoList', icon: 'map'},
  ]);

  const [cardPage, setCardPage] = useState('');
  const renderScene = BottomNavigation.SceneMap({
    notify: () => <CardItems cardPage={cardPage} />,
    FetchData: () => <FetchData setIndex={setIndex} />,
    // recents: RecentsRoute,
    // TestRoute: TestRoute,
    main: Main,
    mqtt: Mqtt,
    // notify: () => <Notify test={testPassProps} />,
    todoList: TodoList,
  });

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
            console.log('?????????app??????????????? ', remoteMessage);
            Alert.alert(
              'HELLO~~ ',
              `??????----- ${remoteMessage.data.screen_name}`,
              [{text: 'OK', onPress: () => changePage(remoteMessage)}],
              {cancelable: false},
            );
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
  const changePage = msg => {
    setIndex(0);
    setCardPage(msg.data.screen_name);
  };
  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      Alert.alert(
        'Confirm',
        `this is just a ${remoteMessage.data.screen_name}`,
        [
          // {
          //   text: 'Cancel',
          //   onPress: () => console.log('Cancel Pressed'),
          //   style: 'cancel',
          // },
          {text: 'OK', onPress: () => changePage(remoteMessage)},
          ,
        ],
        {cancelable: false},
      );
      console.log(
        'app???????????????????????????-----',
        remoteMessage.data.screen_name,
        // remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'app??????????????????-----',
            remoteMessage.data.screen_name,
            // remoteMessage.notification,
          );
          Alert.alert(
            'Confirm',
            `this is just a ${remoteMessage.data.screen_name}`,
            [{text: 'OK', onPress: () => changePage(remoteMessage)}],
            {cancelable: false},
          );
        }
      });
  }, []);
  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default App;
