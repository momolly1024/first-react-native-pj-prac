/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useContext} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SectionList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {BottomNavigation, Button, TextInput, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import TodoList from './src/TodoList';
// import MqttFunc from './src/Mqtt/MqttFunc';
import Mqtt from './src/Mqtt/Mqtt';
import MqttProvider from './src/Mqtt/MqttProvider';
import MqttContext from './src/Mqtt/MqttContext';
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
const getHeader = title => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <Text style={{fontSize: 18, color: 'green', textAlign: 'center'}}>
        test
      </Text>
    </View>
  );
};

const getFooter = loading => {
  if (loading) {
    return null;
  }
  return (
    <Text
      style={{
        fontSize: 14,
        color: 'green',
        textAlign: 'center',
        paddingBottom: 10,
      }}>
      {'Loading...'}
    </Text>
  );
};

const MusicRoute = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json',
    )
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={data.articles}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => <Text>{item.id + '. ' + item.title}</Text>}
          ListHeaderComponent={getHeader}
          ListFooterComponent={getFooter}
        />
      )}
    </SafeAreaView>
  );
};

const Greeting = props => {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
};

const LotsOfGreetings = () => {
  return (
    <View>
      <Greeting name="Rexxar" />
      <Greeting name="Jaina" />
      <Greeting name="Valeera" />
    </View>
  );
};

const AlbumsRoute = () => {
  //   const storedEvents = useContext(MqttContext);
  //   console.log(storedEvents);
  return (
    <Text style={styles.highlight}>MqttProvider Component</Text>

    // <MqttProvider>
    //   <Text style={styles.highlight}>{storedEvents}</Text>;
    //   <Text style={styles.highlight}>MqttProvider Component</Text>;
    // </MqttProvider>
  );
};

const RecentsRoute = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const onPress = () => {
    setCount(count + 1);
  };
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Image
            source={{uri: 'https://reactnative.dev/docs/assets/p_cat1.png'}}
            style={{width: 200, height: 200}}
          />
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text>Click me</Text>
          </TouchableOpacity>
          <View>
            <Text>You clicked {count} times</Text>
          </View>

          <Button icon="camera" onPress={() => alert('qwe')}>
            ALERT
          </Button>
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={() => alert('qwe')}>
            Login with Facebook
          </Icon.Button>
          <TextInput
            placeholder="Type here to translate!"
            onChangeText={newText => setText(newText)}
            defaultValue={text}
          />
          <Text>
            {text
              .split(' ')
              .map(word => word && '🍕')
              .join(' ')}
          </Text>
          <LotsOfGreetings />
        </View>
      </ScrollView>
      <View>
        <SectionList
          sections={[
            {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
            {
              title: 'J',
              data: [
                'Jackson',
                'James',
                'Jillian',
                'Jimmy',
                'Joel',
                'John',
                'Julie',
              ],
            },
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => `basicListEntry-${item.title}`}
        />
      </View>
    </SafeAreaView>
  );
};
const TestRoute = () => {
  const [text, setText] = useState('');

  return (
    <View>
      <Card style={styles.card}>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      </Card>
      <Text>test</Text>
      <TextInput
        label="Email"
        value={text}
        onChangeText={text => setText(text)}
      />
      <TextInput
        mode="outlined"
        label="Email"
        value={text}
        onChangeText={text => setText(text)}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.header}>Header</Text>
            <TextInput placeholder="Username" style={styles.textInput} />
            <View style={styles.btnContainer}>
              <Button title="Submit" onPress={() => null} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'music', title: 'Music', icon: 'gift'},
    {key: 'recents', title: 'Recents', icon: 'history'},
    {key: 'github', title: 'Github', icon: 'github'},
    {key: 'todo', title: 'TodoList', icon: 'github'},
    {key: 'mqtt', title: 'MQTT', icon: 'lock'},
    {key: 'albums', title: 'Albums', icon: 'lock'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    recents: RecentsRoute,
    github: TestRoute,
    todo: TodoList,
    // mqtt: MqttFunc,
    mqtt: Mqtt,
    albums: AlbumsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

const App: () => Node = () => {
  return <MyComponent />;
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  card: {
    margin: 8,
  },
  center: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

export default App;
