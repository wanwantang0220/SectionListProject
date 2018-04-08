import React, {Component} from 'react';
import {Text, View} from 'react-native';
import AlphabetListView from "./SectionListView";
// import AlphabetListView from 'react-native-alphabetlistview';


export default class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                A: ['some', 'entries', 'are here'],
                B: ['some', 'entries', 'are here'],
                C: ['some', 'entries', 'are here'],
                D: ['some', 'entries', 'are here'],
                E: ['some', 'entries', 'are here'],
                F: ['some', 'entries', 'are here'],
                G: ['some', 'entries', 'are here'],
                H: ['some', 'entries', 'are here'],
                I: ['some', 'entries', 'are here'],
                J: ['some', 'entries', 'are here'],
                K: ['some', 'entries', 'are here'],
                L: ['some', 'entries', 'are here'],
                M: ['some', 'entries', 'are here'],
                N: ['some', 'entries', 'are here'],
                O: ['some', 'entries', 'are here'],
                P: ['some', 'entries', 'are here'],
                Q: ['some', 'entries', 'are here'],
                R: ['some', 'entries', 'are here'],
                S: ['some', 'entries', 'are here'],
                T: ['some', 'entries', 'are here'],
                U: ['some', 'entries', 'are here'],
                V: ['some', 'entries', 'are here'],
                W: ['some', 'entries', 'are here'],
                X: ['some', 'entries', 'are here'],
                Y: ['some', 'entries', 'are here'],
                Z: ['some', 'entries', 'are here'],
            }
        }
    }


    render() {
        return (
            <AlphabetListView
                data={this.state.data}
                cell={Cell}
                cellHeight={30}
                sectionListItem={SectionItem}
                sectionHeader={SectionHeader}
                sectionHeaderHeight={22.5}/>
        )
    }

}

class Cell extends Component {
    render() {
        return (
            <View style={{height:30}}>
                <Text>{this.props.item}</Text>
            </View>
        );
    }
}
class SectionHeader extends Component {
    render() {
        // inline styles used for brevity, use a stylesheet when possible
        var textStyle = {
            textAlign:'left',
            color:'#fff',
            fontWeight:'700',
            fontSize:16,
            paddingTop:5,
            paddingBottom:5,
            paddingLeft:10
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