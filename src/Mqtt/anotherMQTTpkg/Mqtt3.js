import React, {useEffect, useState, useContext} from 'react';
import {Text, View} from 'react-native';
import mqtt from '@taoqf/react-native-mqtt';

const client = mqtt.connect('mqtt://test.mosquitto.org');

function Mqtt3() {
  const [data, setData] = useState();
  useEffect(() => {
    client.on('connect', function () {
      client.subscribe('presence', function (err) {
        if (!err) {
          client.publish('presence', 'Hello mqtt');
        }
      });
    });

    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString());
      setData(message);
      client.end();
    });
  }, []);

  return (
    <View>
      <Text>{data}</Text>
    </View>
  );
}

export default Mqtt3;
