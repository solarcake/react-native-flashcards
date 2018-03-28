import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import {AddCard} from './AddCard'
import {Quiz} from './Quiz'
import {black, white} from '../utils/colors'

class DeckView extends React.Component {
    render() {
        const {deck, deckId} = this.props;
        const {title, questions} = deck;
        return (
            <View style={styles.container}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize:40}}>{title}</Text>
                    <Text style={{fontSize:20, marginBottom: 50}}>{questions.length} Cards</Text>
                    <TouchableOpacity style={styles.addCardBtn} onPress={() => this.props.navigation.navigate('AddCard',{deckId: deckId})}><Text style={{textAlign: 'center'}}>Add Card</Text></TouchableOpacity>
                    <TouchableOpacity disabled={questions.length === 0} style={styles.startQuizBtn} onPress={() => this.props.navigation.navigate('Quiz',{deckId: deckId})}><Text style={{color: white, textAlign: 'center'}}>Start Quiz</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles =  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',      
    },
    addCardBtn: {
        padding: 20,
        margin: 5,
        borderWidth: 2,
        width: 200,
        borderColor: black
    },
    startQuizBtn: {
        padding: 20,
        width: 200,
        margin: 2,
        backgroundColor: black
    }
})

function mapStateToProps (state, { navigation }) {
    const { deckId } = navigation.state.params
    
    return {
      deckId,
      deck: state[deckId],
    }
}

export default connect( mapStateToProps)(DeckView);