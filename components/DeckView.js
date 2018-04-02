import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux'
import {AddCard} from './AddCard'
import {Quiz} from './Quiz'
import {black, white} from '../utils/colors'

class DeckView extends React.Component {
    handleQuizStart(questions) {
        if (questions.length === 0) {
            return Alert.alert('Cannot start quiz with no cards, please add some cards first');
        }

        const {deckId} = this.props;
        this.props.navigation.navigate('Quiz',{deckId: deckId});
    }

    render() {
        const {deck, deckId} = this.props;
        const {title, questions} = deck;
        return (
            <View style={styles.container}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize:40}}>{title}</Text>
                    <Text style={{fontSize:20, marginBottom: 50}}>{questions.length} Cards</Text>
                    <TouchableOpacity style={styles.addCardBtn} onPress={() => this.props.navigation.navigate('AddCard',{deckId: deckId})}><Text style={{textAlign: 'center'}}>Add Card</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.startQuizBtn} onPress={() => this.handleQuizStart(questions)}><Text style={{color: white, textAlign: 'center'}}>Start Quiz</Text></TouchableOpacity>
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