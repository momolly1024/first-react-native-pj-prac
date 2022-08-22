import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {MqttContext} from './MqttContext';

const MqttProvider = props => {
  const [event, setEvent] = useState('12345');

  return (
    <MqttContext.Provider value={{event}}>
      {props.children}
    </MqttContext.Provider>
  );
};

export default MqttProvider;
