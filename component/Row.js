import React, { Component } from 'react';
import { View, Dimensions} from 'react-native';

import Cell from './Cell';

const {height, width} = Dimensions.get('window')

const styles = {
    row: {
        height: (width - 40 - 50) / 4,
        marginVertical: 3,
        flexDirection: 'row',
    }
}

export default class Row extends React.Component {
    render() {
        return (
            <View style={styles.row}>
                <Cell tile={this.props.cell1}/>
                <Cell tile={this.props.cell2}/>
                <Cell tile={this.props.cell3}/>
                <Cell tile={this.props.cell4}/>
            </View>
        )
    }
}