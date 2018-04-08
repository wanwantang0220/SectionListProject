import React, {Component} from 'react';
import {StyleSheet, Image, Style, Text, Button, View} from 'react-native';

export default class Recommend extends Component {

    render() {

        return (
            <View>
                <Text style={[styles.textColor]}>Recommend</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    textColor:{
        fontSize: 16,
        color:'#a9a9a9',
    }

});