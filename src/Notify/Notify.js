/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import styles from '../css/styles';

let fcmUnsubscribe = null;

function Notify(props) {
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
              remoteMessage.notification.title,
              remoteMessage.notification.body,
            );
          });
        }
      })
      .catch(err => {
        console.log('messaging.requestPermission Error: ', err);
      });
  }, []);
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.highlight}>{props.test}</Text>
    </View>
  );
}

export default Notify;
