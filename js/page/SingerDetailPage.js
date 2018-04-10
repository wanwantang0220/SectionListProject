import React, {Component} from 'react';
import {StyleSheet, Image, Style, Text, Button, View, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class SingerDetailPage extends Component {

    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        if (state.params != undefined) {
            return {
                title: state.params.item.fsinger_name,
                headerTitleStyle: {
                    alignSelf: 'center'
                },
            }
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            picUrl: null,
            dataSource: [],
        }
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        const singerMid = params.item.fsinger_mid;
        const singerId = params.item.fsinger_id;
        this.fetchPic(singerMid);
        this.fetchData(singerId);
    }

    render() {

        const {navigate} = this.props.navigation;

        return (
            <View>
                <Image style={[styles.pic]}
                       source={{uri: this.state.picUrl}}/>
            </View>
        )
    }


    /**
     * 获取图片
     */
    fetchPic(singerMid) {
        const url = 'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + singerMid + '.jpg';
        this.setState({
            picUrl: url
        })
    }


    fetchData(singerId) {

    }
}

const styles = StyleSheet.create({
    pic: {
        width: width,
        height: 200
    }
});