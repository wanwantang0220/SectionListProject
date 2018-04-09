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
    ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';


const SECTIONHEIGHT = 30;
const ROWHEIGHT = 40
var totalheight = [];//每个字母对应的城市和字母的总高度


const {width, height} = Dimensions.get('window');

export default class MySelectList extends Component {

    static  propTypes = {
        allCityList: PropTypes.array,
        onSelectCity: PropTypes.func
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
            console.log('key', key);

            if (dataBlob[key]) {
                let subList = dataBlob[key];
                subList.push(item);
            } else {
                let subList = [];
                subList.push(item);
                dataBlob[key] = subList;
            }

            console.log('dataBlob', dataBlob);
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
        //

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.listContainner}>
                    <ListView
                        ref={listView => this.listView = listView}
                        contentContainerStyle={styles.contentContainer}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderListRow}
                        renderSectionHeader={this.renderListSectionHeader}
                        enableEmptySections={true}
                        initialListSize={500}
                    />
                    <View style={styles.letters}>
                        {this.state.letters.map((letter, index) => this.renderRightLetters(letter, index))}
                    </View>
                </View>
            </View>
        )
    }


    renderListRow(item, rowId) {
        return (
            <TouchableOpacity
                key={'list_item_' + item.fsinger_id}
                style={styles.rowView}
                onPress={() => {
                    this.itemClick(item)
                }}>
                <View style={styles.rowdata}>
                    <Text style={styles.rowdatatext}>{item.fsinger_name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    itemClick() {
        //this.props.nav.pop();
        console.log('itemClick')
    }

    renderListSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.sectionView}>
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
    }
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: 50,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F4F4F4',
        // paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏
    },
    listContainner: {
        height: Dimensions.get('window').height,
        marginBottom: 10
    },
    contentContainer: {
        flexDirection: 'row',
        width: width,
        backgroundColor: 'white',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    letters: {
        position: 'absolute',
        height: height,
        top: 0,
        bottom: 0,
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
        backgroundColor: '#F4F4F4',
    },
    sectionText: {
        color: '#a9a9a9',
        fontWeight: 'bold'
    },
    rowView: {
        height: ROWHEIGHT,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: '#F4F4F4',
        borderBottomWidth: 0.5,
    },
    rowdata: {
        paddingTop: 10,
        paddingBottom: 2,
    },
    rowdatatext: {
        color: 'gray',
        width: width,
    },
});

