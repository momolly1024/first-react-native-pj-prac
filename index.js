import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

//  import {AppRegistry} from 'react-native';
//  import App from './App';
//  import {name as appName} from './app.json';
//  import messaging from '@react-native-firebase/messaging';
//  messaging().setBackgroundMessageHandler(async remoteMessage => {
//    console.log('Message is handled in the background!', remoteMessage);
//  });
//  // AppRegistry.registerComponent(appName, () => App);
//  function HeadlessCheck({isHeadless}) {
//    if (isHeadless) {
//      console.log('App launched by iOS in background, ignore it');
//      // App has been launched in the background by iOS, ignore
//      return null;
//    }
//    return <App />;
//  }
//  AppRegistry.registerComponent(appName, () => HeadlessCheck);
