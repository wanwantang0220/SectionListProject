import React, {Component} from 'react';
import {StyleSheet, Image, Style, Text, Button, View,Line} from 'react-native';

export default class Recommend extends Component {

    render() {

        var imgurl = 'http://y.gtimg.cn/music/photo_new/T003R720x288M000002FZngy4ZQQbK.jpg';
        const item = this.props.item;


        return (
            <View style={[styles.row, {borderColor: '#a9a9a9', borderRightWidth: 1, flex: 1}]}>
                <View style={{flex: 1, paddingLeft: 5, paddingTop: 2, paddingBottom: 2,}}>
                    <Image style={[styles.image]}
                           source={{uri: item.imgurl}}/>
                </View>
                <View style={{flex: 4, paddingLeft: 5, paddingTop: 2, paddingBottom: 2, paddingRight: 5}}>
                    <Text style={[styles.textColorTitle]}>{item.creator.name}</Text>
                    <Text style={[styles.textColor]}>{item.dissname}</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    textColor: {
        fontSize: 12,
        color: '#a9a9a9',
    },
    textColorTitle:{
        fontSize: 14,
        color: '#ffffff',
    },
    row: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5
    },
    image: {
        width: 60,
        height: 70
    }

});