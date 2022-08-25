import React, {Component, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import {Input, Button} from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {},
});

export default function MqttHook() {
  const [state, setState] = React.useState();
  function onConnect() {
    console.log('onConnect');
  }

  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  }
  function onMessageArrived(message) {
    setState(message.payloadString);
    console.log('onMessageArrived:' + message.payloadString);
  }
  const client = new Paho.MQTT.Client('iot.eclipse.org', 443, 'uname');

  React.useEffect(() => {
    console.log('state');
  }, [state]);

  React.useEffect(() => {
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({onSuccess: onConnect, useSSL: true});
  }, []);

  return (
    <View>
      <Text>MqttHook</Text>
    </View>
  );
}

// init({
//   size: 10000,
//   storageBackend: AsyncStorage,
//   defaultExpires: 1000 * 3600 * 24,
//   enableCache: true,
//   sync: {},
// });

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: '100%',
//   },
// });

// export default class MqttHook extends Component {
//   constructor(props) {
//     super(props);

//     const client = new Paho.MQTT.Client('iot.eclipse.org', 443, 'uname');
//     client.onConnectionLost = this.onConnectionLost;
//     client.onMessageArrived = this.onMessageArrived;
//     client.connect({onSuccess: this.onConnect, useSSL: true});

//     this.state = {
//       text: ['...'],
//       client,
//     };
//   }

//   pushText = entry => {
//     const {text} = this.state;
//     this.setState({text: [...text, entry]});
//   };

//   onConnect = () => {
//     const {client} = this.state;
//     client.subscribe('WORLD');
//     this.pushText('connected');
//   };

//   onConnectionLost = responseObject => {
//     if (responseObject.errorCode !== 0) {
//       this.pushText(`connection lost: ${responseObject.errorMessage}`);
//     }
//   };

//   onMessageArrived = message => {
//     this.pushText(`new message: ${message.payloadString}`);
//   };

//   render() {
//     const {text} = this.state;

//     return (
//       <View style={styles.container}>
//         {text.map(entry => (
//           <Text>{entry}</Text>
//         ))}
//         <Text>aaa</Text>
//       </View>
//     );
//   }
// }
