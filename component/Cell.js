import React, { Component } from 'react';
import { View, Dimensions, Text} from 'react-native';

const {height, width} = Dimensions.get('window')

//每个块的边长
var ITEM_WIDTH = (width - 20) / 4;
//margin值
var MARGIN_WIDTH = 3;

export default class Cell extends React.Component {

    render() {

        var tilePostion = {
            top: 15 * this.props.tile.x + MARGIN_WIDTH,
            left: (MARGIN_WIDTH + ITEM_WIDTH) * this.props.tile.y + MARGIN_WIDTH,
        }

        var tileColor = this.props.tile.value > 2048 ? styles['tilesuper'] : styles['tile' + this.props.tile.value];
        var fontStyle = this.props.tile.value > 2048 ? styles['tilesuperText'] : styles['tile' + this.props.tile.value + 'Text'];

        return (
            <View style={[styles.cell, tilePostion, this.props.tile.value > 0 && tileColor]}>
                <Text style={this.props.tile.value > 0 && fontStyle}>{this.props.tile.value > 0 ? this.props.tile.value : ""}</Text>
            </View>
        )
    }
}

const styles = {
    cell: {
        position: 'absolute',
        width: ITEM_WIDTH,
        height: ITEM_WIDTH,
        marginHorizontal: 3,
        backgroundColor: 'rgba(238, 210, 200, 0.35)',
        // backgroundColor: '#EA7821',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tile2: {
        backgroundColor: '#EEE4DA',
    },
    tile2Text: {
        fontSize: 40,
    },
    tile4: {
        backgroundColor: '#EDE0C8',
    },
    tile4Text: {
        fontSize: 40,
    },
    tile8: {
        backgroundColor: '#F2B179',
    },
    tile8Text: {
        fontSize: 40,
    },
    tile16: {
        backgroundColor: '#F49563',
    },
    tile16Text: {
        fontSize: 40,
    },
    tile32: {
        backgroundColor: '#F5794D',
    },
    tile32Text: {
        fontSize: 40,
    },
    tile64: {
        backgroundColor: '#F55D37',
    },
    tile64Text: {
        fontSize: 40,
    },
    tile128: {
        backgroundColor: '#EEE863',
    },
    tile128Text: {
        fontSize: 30,
    },
    tile256: {
        backgroundColor: '#EDB04D',
    },
    tile256Text: {
        fontSize: 30,
    },
    tile512: {
        backgroundColor: '#ECB04D',
    },
    tile512Text: {
        fontSize: 30,
    },
    tile1024: {
        backgroundColor: '#EB9437',
    },
    tile1024Text: {
        fontSize: 30,
    },
    tile2048: {
        backgroundColor: '#EA7821',
    },
    tile2048Text: {
        fontSize: 30,
    },
    tilesuper: {
        backgroundColor: '#EA7821',
    },
    tilesuperText: {
        fontSize: 20,
    },
}