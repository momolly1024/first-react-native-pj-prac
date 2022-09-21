import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
let fcmUnsubscribe = null;
export default function Notify() {
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
    <View>
      <Text style={styles.title}>Notify</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
  },
});
