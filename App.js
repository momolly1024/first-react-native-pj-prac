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

const App: () => Node = () => {
  const [index, setIndex] = useState(0);
  const [testPassProps, setTestPassProps] = useState('HELLO ~~~');
  const [routes] = useState([
    {key: 'notify', title: 'CardItems', icon: 'lock'},
    {key: 'FetchData', title: 'FetchData', icon: 'gift'},
    // {key: 'recents', title: 'Recents', icon: 'history'},
    // {key: 'TestRoute', title: 'TestRoute', icon: 'github'},
    {key: 'main', title: 'Main', icon: 'github'},
    {key: 'mqtt', title: 'MQTT', icon: 'lock'},
    {key: 'todoList', title: 'todoList', icon: 'map'},
  ]);
  useEffect(() => {
    setTestPassProps('SOMETHING...');
  }, []);

  const renderScene = BottomNavigation.SceneMap({
    notify: () => <CardItems setIndex={setIndex} />,
    FetchData: () => <FetchData setIndex={setIndex} />,
    // recents: RecentsRoute,
    // TestRoute: TestRoute,
    main: Main,
    mqtt: Mqtt,
    // notify: () => <Notify test={testPassProps} />,
    todoList: TodoList,
  });

  //   const navigation = useNavigation();

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default App;
