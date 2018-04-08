import React, {Component} from 'react';
import {StyleSheet, Image, Style, Text,Button,View} from 'react-native';

export default class MePage extends Component {

    static navigationOptions = {
        title: '我的',
        tabBarLabel: '我的',
        headerTitleStyle: {
            alignSelf: 'center'
        },
    };

    render() {

        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button onPress={()=> navigate('Movie')}
                        title='音乐'/>
            </View>
        )
    }
}