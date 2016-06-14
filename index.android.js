/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';

import Grid from './component/Grid';
import Playground from './test/Playground';
import Flix from './test/Flix';

class RN2048 extends React.Component {
  render() {
    return (
      <View>        
        <Flix navigator={this.props.navigator}/>
      </View>
    );
  }
}
// <Grid navigator={this.props.navigator}/>

AppRegistry.registerComponent('Game2048', () => RN2048);
