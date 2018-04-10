import React, {Component} from 'react';
import {StyleSheet, Image, Style, Text, Button, View} from 'react-native';

export default class SingerDetailPage extends Component {

    static navigationOptions = {
        headerTitle: '我的',
        headerTitleStyle: {
            alignSelf: 'center'
        },
        headerTintColor: "#00000000",
        headerStyle: {
            background: "#00000000"
        },
        headerLeft:
            <Text style={{marginLeft: 5, width: 30, textAlign: "center"}}>
                <Image size={24} color='white'/>
            </Text>


    };

    // onPress={() => navigation.state.params.navigatePress()}

    render() {

        const {navigate} = this.props.navigation;
        return (
            <View>
                <Button onPress={() => navigate('Movie')}
                        title='音乐'/>
            </View>
        )
    }
}