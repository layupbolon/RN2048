import React, { Component } from 'react';
import { Dimensions, View, PanResponder, Alert, AsyncStorage} from 'react-native';

import Row from './Row';
import Tile from './Tile';
import {Enumerable} from 'linq6';
import Score from './score';

const {height, width} = Dimensions.get('window')

export default class Grid extends React.Component {

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._startShouldSetResponder,
            onMoveShouldSetPanResponder: this._moveShouldSetResonder,
            onPanResponderGrant: this._panResponderGrant,
            onPanResponderMove: this._panResponderMove,
            onPanResponderRelease: this._panResponderRelease.bind(this),
        })
        this.moving = false;
        this.initializeGame();
    }

    _startShouldSetResponder(e, gestureState) {
        return true;
    }
    _moveShouldSetResonder(e, gestureState) {
        return true;
    }
    _panResponderGrant(e, gestureState) {
        this.moving = true;
    }
    _panResponderMove(e, gestureState) {
    }
    _panResponderRelease(e, gestureState) {
        var dx = gestureState.dx;
        var dy = gestureState.dy;

        var absDx = dx > 0 ? dx : -dx;
        var absDy = dy > 0 ? dy : -dy;

        var direction = absDx > absDy ? (dx > 0 ? 2 : 4) : (dy > 0 ? 3 : 1);
        var canMove = absDx > 10 || absDy > 10;

        //上１　右２　下３　４左
        if (canMove) {
            switch (direction) {
                case 1: this.moveTile_up(); break;
                case 2: this.moveTile_right(); break;
                case 3: this.moveTile_down(); break;
                case 4: this.moveTile_left(); break;
            }
            this.addRandomCell();
        }
        this.moving = false;
    }

    _ConvertListToString(array) {
        if (array && array.length > 0) {
            let str = "";
            for (let i = 0; i < array.length; i++) {
                str += array[i];
                if (i !== array.length - 1) {
                    str += ",";
                }
            }

            return str;
        }
        return "";
    }

    _ArrayHandle(values) {
        if (values && values.length > 0) {
            let IsAdd = false;

            for (let i = 0; i < 4; i++) {
                for (let y = 0; y < 4; y++) {
                    if (values[i] === values[i + 1] && values[i] !== 0 && !IsAdd) {
                        this.score += values[i] + values[i + 1];
                        this.setState({
                            GameScore: this.score
                        });
                        values[i] = values[i] + values[i + 1];
                        // values.pop(values[i + 1]);
                        values.RemoveByIndex(i + 1);
                        values.push(0);
                        IsAdd = true;
                    }
                    else if (values[i + 1] === 0) {
                        values.RemoveByIndex(i + 1);
                        values.push(0);
                    }
                    else {
                        break;
                    }
                }

                if (i > 0) {
                    for (let z = i; z >= 0; z--) {
                        if (values[z] == 0) {
                            values.RemoveByIndex(z);
                            values.push(0);
                        }
                    }
                }
                if (IsAdd) break;
            }

            return values;
        }

        return new Array();
    }

    _cloneArray(source) {
        var destination = [];
        for (var i in source) {
            if (this.getType(source[i]) == 'array') {
                destination[i] = this._cloneArray(source[i]);
            } else {
                destination[i] = source[i];
            }
        }
        return destination;
    }

    getType(array) {
        return (Object.prototype.toString.call(array).slice(8, -1).toLowerCase());
    };

    moveTile_up() {
        console.log("上");
        let count = 0;
        for (let i = 0; i < 4; i++) {
            let values = Enumerable.from(this.state.AllCells).where(a => a.y === i).select(a => a.value).toArray();

            let str = this._ConvertListToString(values);
            //处理逻辑
            let result = this._ArrayHandle(values);
            let str2 = this._ConvertListToString(result);

            let cells = this._cloneArray(this.state.AllCells);
            let values2 = Enumerable.from(this.state.AllCells).where(a => a.y === i).select(a => a).toArray();
            for (let k = 0; k < values.length; k++) {
                cells[values2[k].id].value = result[k];
            }

            this.setState({
                AllCells: cells
            });

            if (str !== str2) count++;
        }

        return count > 0;
    }

    moveTile_right() {
        console.log("右");
        let count = 0;
        for (let i = 0; i < 4; i++) {
            let values = Enumerable.from(this.state.AllCells).where(a => a.x === i).select(a => a.value).toArray();
            values = values.reverse();
            // //按照值大到小排序
            // values.sort(function (a, b) {
            //     return b - a;
            // })

            let str = this._ConvertListToString(values);
            //处理逻辑
            let result = this._ArrayHandle(values);
            let str2 = this._ConvertListToString(result);

            let cells = this._cloneArray(this.state.AllCells);
            let values2 = Enumerable.from(this.state.AllCells).where(a => a.x === i).select(a => a).toArray();
            //按照值大到小排序
            values2 = values2.reverse();
            for (let k = 0; k < values.length; k++) {
                cells[values2[k].id].value = result[k];
            }

            this.setState({
                AllCells: cells
            });

            if (str !== str2) count++;
        }

        return count > 0;
    }

    moveTile_down() {
        console.log("下");
        let count = 0;
        for (let i = 0; i < 4; i++) {
            let values = Enumerable.from(this.state.AllCells).where(a => a.y === i).select(a => a.value).toArray();
            values = values.reverse();

            let str = this._ConvertListToString(values);
            //处理逻辑
            let result = this._ArrayHandle(values);
            let str2 = this._ConvertListToString(result);

            let cells = this._cloneArray(this.state.AllCells);
            let values2 = Enumerable.from(this.state.AllCells).where(a => a.y === i).select(a => a).toArray();
            //按照值大到小排序
            values2 = values2.reverse();
            for (let k = 0; k < values.length; k++) {
                cells[values2[k].id].value = result[k];
            }

            this.setState({
                AllCells: cells
            });

            if (str !== str2) count++;
        }

        return count > 0;
    }

    moveTile_left() {
        console.log("左");
        let count = 0;
        for (let i = 0; i < 4; i++) {
            let values = Enumerable.from(this.state.AllCells).where(a => a.x === i).select(a => a.value).toArray();

            let str = this._ConvertListToString(values);
            //处理逻辑
            let result = this._ArrayHandle(values);
            let str2 = this._ConvertListToString(result);

            let cells = this._cloneArray(this.state.AllCells);
            let values2 = Enumerable.from(this.state.AllCells).where(a => a.x === i).select(a => a).toArray();
            for (let k = 0; k < values.length; k++) {
                cells[values2[k].id].value = result[k];
            }

            this.setState({
                AllCells: cells
            });

            if (str !== str2) count++;
        }

        return count > 0;
    }

    initializeGame() {
        this.score = 0;

        let cells = [];
        let count = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let tile = new Tile(count++, { x: i, y: j }, 0);
                cells.push(tile);
            }
        }
        this.state = {
            AllCells: cells,
            GameScore: this.score
        }

        this.addRandomCell();
        this.addRandomCell();
    }

    addRandomCell() {
        let emptyCellIndexs = Enumerable.from(this.state.AllCells).where(a => a.value === 0).select(a => a).toArray();
        // let emptyCellIndexs = [];
        if (emptyCellIndexs.length < 1) {
            //game over
            Alert.alert(
                "Game Over",
                "您的得分是【" + this.state.GameScore + "】，是否重新开始游戏？",
                [
                    { text: 'OK', onPress: () => this.initializeGame() },
                    { text: '取消' }
                ]
            )
            return;
        }

        let index = this.Random(0, emptyCellIndexs.length - 1);

        let cells = this._cloneArray(this.state.AllCells);

        cells[emptyCellIndexs[index].id].value = Math.random() > 0.65 ? 2 : 4;

        this.setState({
            AllCells: cells
        });
    }

    Random(min, max) {
        var c = max - min + 1;
        return Math.floor(Math.random() * c + min);
    }

    render() {
        if (this.state.AllCells) {
            return (
                <View {...this._panResponder.panHandlers}>
                    <Score score={this.state.GameScore} />
                    <Row cell1={this.state.AllCells[0]} cell2={this.state.AllCells[1]} cell3={this.state.AllCells[2]} cell4={this.state.AllCells[3]} />
                    <Row cell1={this.state.AllCells[4]} cell2={this.state.AllCells[5]} cell3={this.state.AllCells[6]} cell4={this.state.AllCells[7]} />
                    <Row cell1={this.state.AllCells[8]} cell2={this.state.AllCells[9]} cell3={this.state.AllCells[10]} cell4={this.state.AllCells[11]} />
                    <Row cell1={this.state.AllCells[12]} cell2={this.state.AllCells[13]} cell3={this.state.AllCells[14]} cell4={this.state.AllCells[15]} />
                </View>
            )
        }

        return null;
    }
}

Array.prototype.RemoveByIndex = function (dx) {
    if (isNaN(dx) || dx > this.length) { return false; }
    this.splice(dx, 1);
}