## notification

https://blog.openreplay.com/mobile-push-notifications-with-firebase

- app 背景執行時/關閉 app 時 /開啟 app 時

python(要先取得 APP 的 registration_token 傳給後端，後端再發送?maybe~~)

```py
import firebase_admin
from firebase_admin import credentials
from firebase_admin import messaging
import datetime

cred = credentials.Certificate("./serviceAccountKey.json")
default_app = firebase_admin.initialize_app(credential=cred)
registration_token = ""

messages = [
    messaging.Message(
        notification=messaging.Notification(
            title="qqqqqqqqq",
            body="wwwwwwwwwww",
        ),
        data={
            "screen_name": "RRRR",
            "title": "great match!",
            "body": "PortugalVSDenmark",
        },
        token=registration_token,
    ),
]

response = messaging.send_all(messages)
print("{0} messages were sent successfully".format(response.success_count))

```

#### q

![](https://i.imgur.com/I1dLXbW.png)
![](https://i.imgur.com/89Im2YH.png)
![](https://i.imgur.com/qAkuyVK.png)

### reference

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
const FetchData = () => {
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
