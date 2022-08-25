/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import {Input, Button} from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});
const options = {
  //   host: 'broker.emqx.io',
  host: '35.201.195.240',
  port: 8083,
  path: '/testTopic',
  id: 'id_' + parseInt(Math.random() * 100000),
};

// 创建客户端实例
const client = new Paho.MQTT.Client(options.host, options.port, options.path);

function Mqtt2() {
  const [topic, setTopic] = useState('event/#');
  const [subscribedTopic, setSubscribedTopic] = useState({});
  const [message, setMessage] = useState({});
  const [messageList, setMessageList] = useState({});
  const [status, setStatus] = useState('');

  const onConnect = () => {
    console.log('onConnect');
    setStatus('connected');
  };
  const onFailure = err => {
    console.log('Connect failed!');
    console.log(err);
    setStatus('failed');
  };
  const connect = () => {
    setStatus('isFetching');
  };
  useEffect(() => {
    if (status === 'isFetching') {
      client.connect({
        onSuccess: onConnect,
        useSSL: false,
        timeout: 3,
        onFailure: onFailure,
      });
    }
  }, [status]);
  useEffect(() => {
    onMessageArrived();
    // client.onMessageArrived = onMessageArrived();
  }, []);

  const onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  };

  const onMessageArrived = message => {
    // console.log('onMessageArrived:' + message.payloadString);
    const newmessageList = messageList;
    newmessageList.unshift(message.payloadString);
    setMessageList(newmessageList);
    // this.MessageListRef.scrollToEnd({animated: false});
  };
  const onChangeTopic = text => {
    setTopic(text);
  };
  const subscribeTopic = () => {
    setSubscribedTopic(topic);
  };

  useEffect(() => {
    client.subscribe(subscribedTopic, {qos: 0});
  }, [subscribedTopic]);

  const unSubscribeTopic = () => {
    client.unsubscribe(subscribedTopic);
    setSubscribedTopic('');
  };
  const onChangeMessage = text => {
    setMessage(text);
  };
  const sendMessage = () => {
    const msg = new Paho.MQTT.Message(options.id + ':' + message);
    msg.destinationName = subscribedTopic;
    client.send(msg);
  };

  const renderRow = ({item, index}) => {
    const idMessage = item.split(':');
    console.log('>>>ITEM', item);
    return (
      <View
        style={[
          styles.componentMessage,
          idMessage[0] == options.id
            ? styles.myMessageComponent
            : idMessage.length == 1
            ? styles.introMessage
            : styles.messageComponent,
        ]}>
        <Text
          style={idMessage.length == 1 ? styles.textIntro : styles.textMessage}>
          {item}
        </Text>
      </View>
    );
  };
  const _keyExtractor = (item, index) => item + index;

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginBottom: 50,
          textAlign: 'center',
          color: status === 'connected' ? 'green' : 'black',
        }}>
        ClientID: {options.id}
      </Text>
      {status === 'connected' ? (
        <View>
          <Button
            type="solid"
            title="DISCONNECT"
            onPress={() => {
              client.disconnect();
              setStatus('');
            }}
            buttonStyle={{marginBottom: 50, backgroundColor: '#397af8'}}
            icon={{
              name: 'lan-disconnect',
              type: 'material-community',
              color: 'white',
            }}
          />
          <View style={{marginBottom: 30, alignItems: 'center'}}>
            <Input
              label="TOPIC"
              placeholder=""
              value={topic}
              onChangeText={onChangeTopic}
              disabled={subscribedTopic}
            />
            {subscribedTopic ? (
              <Button
                type="solid"
                title="UNSUBSCRIBE"
                onPress={unSubscribeTopic}
                buttonStyle={{backgroundColor: '#397af8'}}
                icon={{
                  name: 'link-variant-off',
                  type: 'material-community',
                  color: 'white',
                }}
              />
            ) : (
              <Button
                type="solid"
                title="SUBSCRIBE"
                onPress={subscribeTopic}
                buttonStyle={{backgroundColor: '#397af8'}}
                icon={{
                  name: 'link-variant',
                  type: 'material-community',
                  color: 'white',
                }}
                disabled={!topic || topic.match(/ /) ? true : false}
              />
            )}
          </View>
        </View>
      ) : (
        <Button
          type="solid"
          title="CONNECT"
          onPress={connect}
          buttonStyle={{
            marginBottom: 50,
            backgroundColor: status === 'failed' ? 'red' : '#397af8',
          }}
          icon={{
            name: 'lan-connect',
            type: 'material-community',
            color: 'white',
          }}
          loading={status === 'isFetching' ? true : false}
          disabled={status === 'isFetching' ? true : false}
        />
      )}
      {status === 'connected' ? (
        <View style={styles.messageBox}>
          <FlatList
            // ref={ref => (MessageListRef = ref)}
            data={messageList}
            renderItem={renderRow}
            keyExtractor={_keyExtractor}
            extraData={message}
          />
        </View>
      ) : (
        ''
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
  },
  messageBox: {
    margin: 16,
    flex: 1,
    height: 120,
  },
  myMessageComponent: {
    backgroundColor: '#000000',
    borderRadius: 3,
    padding: 5,
    marginBottom: 5,
  },
  messageComponent: {
    marginBottom: 5,
    backgroundColor: '#0075e2',
    padding: 5,
    borderRadius: 3,
  },
  introMessage: {},
  textInput: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 5,
  },
  textIntro: {
    color: 'black',
    fontSize: 12,
  },
  textMessage: {
    color: 'white',
    fontSize: 16,
  },
});

export default Mqtt2;
