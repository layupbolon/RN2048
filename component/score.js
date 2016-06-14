import React, { Component } from 'react';
import { View, Text} from 'react-native';

export default class Score extends React.Component {
    render() {
        return (
            <View style={styles.scoreView}>
                <Text style={styles.scoreFont}>得分: {this.props.score}</Text>
            </View>
        )
    }
}

const styles = {
    scoreView: {
        alignItems: 'center',
    },
    scoreFont: {
        fontSize: 40
    }
}