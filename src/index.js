/**
 * @format
 */
import {AppRegistry} from 'react-native';

import {App} from './App';

AppRegistry.registerComponent(appName, () => App);

AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
