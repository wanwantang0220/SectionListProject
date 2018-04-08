import React, {Component} from 'react';
import {StyleSheet, ScrollView, RefreshControl, Dimensions, Text, Image, View} from 'react-native';
import Swiper from 'react-native-swiper'
import theme from '../config/theme';
import Recommend from '../component/Recommend';


const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;

export default class RecommendPage extends Component {

    static navigationOptions = {
        title: '首页',
        headerTitle: 'Music',
        headerTitleStyle: {
            alignSelf: 'center',
            textAlign: 'center',
            flexGrow: 1,
            color: '#ffcd32',
            fontFamily: 'Montserrat-Regular',
        },
        headerRight: <View/>,
        headerStyle: {
            elevation: 0,
            height: 50,
            backgroundColor: '#000000',
            paddingLeft: 20,
            paddingRight: 0,
        },
        cardStack: {
            gesturesEnabled: false
        },
    };


    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            loadedData: false,
            dataSource: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {

        return (
            <ScrollView
                style={{backgroundColor: '#000000'}}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        colors={['red', '#ffd500', '#0080ff', '#99e600']}
                        tintColor={theme.themeColor}
                        title="Loading..."
                        titleColor={theme.themeColor}/>}>
                {this.contentSwiper()}
                <Text style={{color: '#ffcd32', textAlign: 'center'}}>热门歌单推荐</Text>
                {this.contentView()}
            </ScrollView>
        )
    }

    onRefresh() {
        this.setState({
            refreshing: true
        });
        this.fetchData();
    }

    /**
     * 轮播图
     */
    contentSwiper() {

        var imgUrl = 'http://y.gtimg.cn/music/photo_new/T003R720x288M000003gXZ394C6bbc.jpg';

        if (!this.state.refreshing || this.state.loadedData) {
            return (
                <Swiper style={{height: 200, horizontal: true, autoplay: true}}>
                    <View>
                        <Image
                            style={styles.image}
                            source={{uri: {imgUrl}}}/>
                    </View>
                </Swiper>
            )
        }
    }

    /**
     * 列表组件
     */
    contentView() {
        const dataSource = this.state.dataSource;
        const {navigate} = this.props.navigation;
        if (!this.state.refreshing || this.state.loadedData) {

            return (
                <View style={{marginBottom: 50, marginTop: 20, marginRight: 10, marginLeft: 10}}>
                    {dataSource.map((item, index) => {
                        return <Recommend key={index} item={item} navigate={navigate}
                                          onPress={this.onClickListener.bind(this)}/>
                    })}
                </View>
            )
        }
    }

    onClickListener() {
        this.props.navigation.navigate('Detail');
    }


    fetchData() {
        var url = 'http://vuemusic.t.imooc.io/api/getDiscList?inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000';

        fetch(url).then((response) => response.json())
            .then((responseData) => {
                let resList = responseData.data.list;
                var dataBlob = [];
                for (let i in resList) {
                    let info = {
                        dissid: resList[i].dissid,
                        createtime: resList[i].createtime,
                        commit_time: resList[i].commit_time,
                        dissname: resList[i].dissname,
                        imgurl: resList[i].imgurl,
                        listennum: resList[i].listennum,
                        introduction: resList[i].introduction,
                        creator: resList[i].creator
                    }
                    dataBlob.push(info);
                }

                if (dataBlob.length !== 0) {
                    this.setState({
                        refreshing: false,
                        loadedData: true,
                        dataSource: dataBlob
                    });
                }
            }).done()
    }
}

const styles = StyleSheet.create({

    header_title: {
        backgroundColor: '#f00',
        color: '#fff',
        height: 55,
        textAlign: 'center',
        fontSize: 16,
        paddingTop: 18,
        width: Dimensions.get('window').width - 110 // width of both buttons + no left-right padding
    },
    image: {
        width: screenW,
        height: 200

    }
});