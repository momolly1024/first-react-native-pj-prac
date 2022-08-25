import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList,
} from 'react-native';

import {Button, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../css/styles';

const LotsOfGreetings = () => {
  return (
    <View>
      <Greeting name="Rexxar" />
      <Greeting name="Jaina" />
      <Greeting name="Valeera" />
    </View>
  );
};
const Greeting = props => {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}!</Text>
    </View>
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
          {/* <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={() => alert('qwe')}>
            Login with Facebook
          </Icon.Button> */}
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

export default RecentsRoute;
