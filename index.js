/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Toast from 'react-native-simple-toast';
import Roam from 'roam-reactnative';


function registerListener(){
    console.log('index register')
    Roam.startListener('location', locations => {
        Toast.show(JSON.stringify(locations), Toast.LONG);
    })
}

AppRegistry.registerHeadlessTask('RoamHeadlessService', registerListener());
AppRegistry.registerComponent(appName, () => App);
