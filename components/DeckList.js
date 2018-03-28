import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux'
import {getDecks} from '../utils/api'
import {loadDecks} from  '../actions'
import DeckView from './DeckView'

class DeckList extends React.Component {
    componentDidMount() {
        getDecks().then((decks) => {
            this.props.dispatch(loadDecks(decks));
        })
    }

    renderDeckList(decks) {
      return Object.keys(decks).map((key) => {
        const {title, questions} = decks[key];
        return (<View key={key} style={styles.box}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('DeckView',{deckId: key, title:title})}>
                        <View style={{alignItems:'center'}}>
                         <Text style={{fontSize:25}}>{title}</Text>
                         <Text style={{fontSize:15}}>{questions.length} Cards</Text>
                        </View>
                    </TouchableOpacity>
                </View>
        )})
    }

    render() {
      const decks = this.props.decks;
      return (
        <View style={styles.container}>
            {Object.keys(decks).length > 0 ? 
                this.renderDeckList(decks) : 
            <View style={{alignItems:'center'}}>
                <Text style={{fontSize:20}}>No decks to show</Text>
            </View>
            }
        </View>
      );
    }
}

const styles = StyleSheet.create({
    box: {
        borderBottomColor: '#bbb',
        borderBottomWidth: 2,
        height:60,
        margin:10,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'stretch',  
        justifyContent: 'center',
      }
});


function mapStateToProps(decks) {
    return {
        decks
    }
 }
 
 export default connect(mapStateToProps)(DeckList);

