/**
 * @format */

import {AppRegistry} from 'react-native';
// default
// import App from './App';

import App from './App.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);