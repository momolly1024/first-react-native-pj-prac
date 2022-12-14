import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, FlatList, Alert} from 'react-native';
import styles from '../css/styles';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';

let fcmUnsubscribe = null;

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

const FetchData = props => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //   console.log(data);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json',
    )
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  //   const navigation = useNavigation();

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

export default FetchData;
