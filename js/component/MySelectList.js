/**
 * 自定义SelectionList
 * */

'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    WebView,
    Text,
    Platform,
    Alert,
    TouchableOpacity,
    ListView,
    Dimensions,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Toast, {DURATION} from 'react-native-easy-toast';

const SECTIONHEIGHT = 30;
const ROWHEIGHT = 70
var totalheight = [];//每个字母对应的城市和字母的总高度


const {width, height} = Dimensions.get('window');

export default class MySelectList extends Component {

    static  propTypes = {
        allCityList: PropTypes.array,
        onSelectCity: PropTypes.func,
    }

    constructor(props) {
        super(props);

        var getSectionData = (dataBlob, sectionID) => {
            return sectionID;
        };
        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID][rowID];
        };
        this.state = {
            dataSource: new ListView.DataSource({
                getRowData: getRowData,
                getSectionHeaderData: getSectionData,
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }),
            letters: [],
        };

    }

    componentDidMount() {
        let data = this.props.dataSource;
        this.getList(data);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource && nextProps.dataSource !== this.props.dataSource) {
            this.getList(nextProps.dataSource);
        }
    }

    getList(data) {
        var dataSource = data || this.props.dataSource;

        let letterList = this.getSortLetters(dataSource);

        let dataBlob = {};

        dataSource.map(item => {
            let key = item.findex;

            if (dataBlob[key]) {
                let subList = dataBlob[key];
                subList.push(item);
            } else {
                let subList = [];
                subList.push(item);
                dataBlob[key] = subList;
            }

        });


        //首字母
        let ids = Object.keys(dataBlob);
        //排序
        let sectionIDs = ids.filter((keyword, index) => ids.lastIndexOf(keyword) === index)
            .sort((a, b) => a < b ? -1 : 1);

        let rowIDs = sectionIDs.map(sectionID => {
            let thisRow = [];
            let count = dataBlob[sectionID].length;
            for (let ii = 0; ii < count; ii++) {
                thisRow.push(ii);
            }

            var eachheight = SECTIONHEIGHT + ROWHEIGHT * thisRow.length;
            totalheight.push(eachheight);

            return thisRow;
        });


        this.setState({
            letters: sectionIDs,
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
        });

        // console.log('sectionIDs', sectionIDs);
        // console.log('rowIDs', rowIDs);
        // console.log('dataBlob', dataBlob);

    }

    render() {

        return (
            <View style={styles.containerSelect}>
                <View style={styles.listContainner}>
                    <ListView
                        ref={listView => this.listView = listView}
                        contentContainerStyle={styles.contentContainer}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderListRow.bind(this)}
                        renderSectionHeader={this.renderListSectionHeader}
                        enableEmptySections={true}
                        initialListSize={500}
                    />
                    <View style={styles.letters}>
                        {this.state.letters.map((letter, index) => this.renderRightLetters(letter, index))}
                    </View>
                </View>
                <Toast
                    ref="toast"
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                />
            </View>
        )
    }


    renderListRow(item, rowId) {
        const url = 'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + item.fsinger_mid + '.jpg';

        return (
            <TouchableOpacity
                key={'list_item_' + item.fsinger_id}
                style={styles.rowView}
                activeOpacity={0.85}
                underlayColor={'black'}
                onPress={() => this.props.navigate('SingerDetail')}>
                <View style={[styles.rowdata, {flexDirection: 'row'}]}>
                    <Image style={[styles.circle]}
                           source={{uri: url}}/>
                    <Text style={[styles.rowdatatext, {marginLeft: 10, marginTop: 15}]}>{item.fsinger_name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    itemClick() {
        //this.props.nav.pop();
        this.props.navigate('SingerDetail');
        console.log('itemClick')
    }

    renderListSectionHeader(sectionData, sectionID) {
        return (
            <View style={[styles.sectionView]}>

                <Text style={styles.sectionText}>
                    {sectionData}
                </Text>
            </View>
        );
    }

    getSortLetters(dataList) {
        let list = [];

        for (let j = 0; j < dataList.length; j++) {
            let sortLetters = dataList[j].findex.toUpperCase();

            let exist = false;
            for (let xx = 0; xx < list.length; xx++) {
                if (list[xx] === sortLetters) {
                    exist = true;
                }
                if (exist) {
                    break;
                }
            }
            if (!exist) {
                list.push(sortLetters);
            }
        }


        return list;
    }


    renderRightLetters(letter, index) {
        return (
            <TouchableOpacity
                key={'letter_idx_' + index}
                activeOpacity={0.6}
                onPress={() => {
                    this.scrollTo(index, letter)
                }}>
                <View style={styles.letter}>
                    <Text style={styles.letterText}>{letter}</Text>
                </View>
            </TouchableOpacity>
        );
    }


    /**
     * 滚动到点击的字母位置
     * @param index
     * @param letter
     */
    scrollTo(index, letter) {
        this.refs.toast.close();
        let position = 0;
        for (let i = 0; i < index; i++) {
            position += totalheight[i]
        }
        this.listView.scrollTo({
            y: position
        });
        this.refs.toast.show(letter, DURATION.LENGTH_SHORT);
        // this.refs.toast.show(<View><Text style={{color:'#ffcd32' , fontWeight:'bold', fontSize:16}}>{letter}</Text></View>, DURATION.LENGTH_SHORT);
    }
}

const styles = StyleSheet.create({
    containerSelect: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000000',
        // paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏
    },
    listContainner: {
        height: Dimensions.get('window').height,
        marginBottom: 10
    },
    contentContainer: {
        flexDirection: 'row',
        width: width,
        // backgroundColor: 'white',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    letters: {
        position: 'absolute',
        height: height,
        top: 10,
        bottom: 10,
        right: 10,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    letter: {
        height: height * 3.3 / 100,
        width: width * 3 / 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letterText: {
        textAlign: 'center',
        fontSize: height * 1.1 / 50,
        color: '#a9a9a9'
    },
    sectionView: {
        paddingTop: 5,
        paddingBottom: 5,
        height: 30,
        paddingLeft: 10,
        width: width,
        backgroundColor: '#6E6E6E',
    },
    sectionText: {
        color: '#a9a9a9',
        fontWeight: 'bold',
        fontSize: 14
    },
    rowView: {
        height: ROWHEIGHT,
        marginLeft: 90,
        marginRight: 10,
        // borderBottomColor: '#ffcd32',
        borderBottomWidth: 0.5,
    },
    rowdata: {
        // height: 60,
        backgroundColor: '#000000'
    },
    rowdatatext: {
        color: 'gray',
        width: width,
        paddingTop: 5,
        paddingBottom: 2,
    },
    circle: {
        // alignItems:'center',
        // justifyContent:'center',
        width: 55,
        height: 55,
        backgroundColor: '#000000',
        // borderColor:'green',
        // borderStyle:'solid',
        borderRadius: 100,
        // paddingBottom:2,
        marginLeft: 5,
        marginTop: 5,
    }
});

