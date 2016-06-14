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

class RN2048 extends React.Component {
  render() {
    return (
      <View>        
        <Grid navigator={this.props.navigator}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('Game2048', () => RN2048);
