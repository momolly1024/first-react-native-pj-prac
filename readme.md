


### reference

- https://www.youtube.com/watch?v=ANdSdIlgsEw&ab_channel=ProgrammingwithMash
- https://github.com/mahdi-sharifimehr/RN-Tutorial-Main/tree/RN-Tutorial-24
- https://github.com/mahdi-sharifimehr/RN-Tutorial-Main


### step

- run

```
npx react-native run-android
```

- install pkg

- fix
```
npx react-native log-android
```

```
@react-navigation/bottom-tabs
@react-navigation/drawer
@react-navigation/material-bottom-tabs
@react-navigation/material-top-tabs
@react-navigation/native
@react-navigation/stack
react-native-gesture-handler
react-native-pager-view
react-native-paper
react-native-reanimated
react-native-safe-area-context
react-native-screens
react-native-vector-icon
@react-native-async-storage/async-storage
```

- edit file to import icon pkg
  app/buildgradle

```
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

```

icon docs
`https://oblador.github.io/react-native-vector-icons/`

### fetch API

```
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

```

### CSS

```
<Text style={styles.highlight}>App.js</Text>
...
const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  }
});

```
