import React, {Component} from 'react';
import {StyleSheet, Image, Style, Text, Button, View} from 'react-native';
import MySelectList from "../component/MySelectList";

export default class SingerPage extends Component {

    static navigationOptions = {
        title: '歌手',
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
            dataSource: [],
        }
    }


    componentDidMount() {
        this.fetchData();
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <MySelectList
                onSelectCity={this.onSelectData.bind(this)}
                dataSource={this.state.dataSource}
                navigate = {navigate}
            />
        )
    }

    onSelectData(item) {
        alert('你选择了城市====》' + item.fsinger_name);
    }


    /**
     * 获取歌手列表
     */
    fetchData() {

        var url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg?inCharset=utf-8&outCharset=utf-8&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq';

        fetch(url).then((response) => response.json())
            .then((responseData) => {
                var resList = responseData.data.list;
                var dataSource = [];
                for (let i in resList) {
                    let info = {
                        farea: resList[i].Farea,
                        fattribute_3: resList[i].Fattribute_3,
                        fgenre: resList[i].Fgenre,
                        findex: resList[i].Findex,
                        fother_name: resList[i].Fother_name,
                        fsinger_id: resList[i].Fsinger_id,
                        fsinger_mid: resList[i].Fsinger_mid,
                        fsinger_name: resList[i].Fsinger_name,
                        fsort: resList[i].Fsort,
                        ftype: resList[i].Ftype
                    }
                    dataSource.push(info);
                }

                if (dataSource.length !== 0) {
                    this.setState({
                        dataSource: dataSource,
                    })
                }


            }).done();
    }
}

class Cell extends Component {
    render() {
        return (
            <View style={{height: 30}}>
                <Text>{this.props.item}</Text>
            </View>
        );
    }
}

class SectionHeader extends Component {
    render() {
        // inline styles used for brevity, use a stylesheet when possible
        var textStyle = {
            textAlign: 'left',
            color: '#fff',
            fontWeight: '700',
            fontSize: 16,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10
        };

        var viewStyle = {
            backgroundColor: '#ccc'
        };
        return (
            <View style={viewStyle}>
                <Text style={textStyle}>{this.props.title}</Text>
            </View>
        );
    }
}

class SectionItem extends Component {
    render() {
        return (
            <Text>{this.props.title}</Text>
        );
    }
}