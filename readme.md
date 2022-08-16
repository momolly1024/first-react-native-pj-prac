### step

- install pkg

```
react-native-vector-icons
react-native-paper
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
