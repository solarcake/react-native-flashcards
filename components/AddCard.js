import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {saveDeckTitle} from '../utils/api'
import {connect} from 'react-redux'
import {addCard} from '../actions'
import {addCardToDeck} from '../utils/api'
import {black, white} from '../utils/colors'

class AddCard extends React.Component {
    state = {
       question: null,
       answer: null
   }

    submit(question, answer) {
        const card = {
            question: question,
            answer: answer
        };

        const {deck} = this.props;

        return addCardToDeck(deck, card)
            .then(() => {
                return this.props.addCard(deck, card);
            }).then(()=> {
                Alert.alert(
                    'Card Message',
                    'New Card has been added',
                    [
                      {text: 'View Deck', onPress: () => {
                          this.answerInput.clear()
                          this.questionInput.clear()
                          this.props.navigation.navigate('DeckView', {deckId: deck.title})
                      }},
                      {text: 'Add More', onPress: () => {
                          this.answerInput.clear()
                          this.questionInput.clear()
                      }},
                    ],
                    { cancelable: false }
                )
            });
    }

    render() {
      return (
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <TextInput ref={input => { this.questionInput = input }}  maxlength="15" onChangeText={(text) => this.setState({question: text})} placeholder="Question" style={styles.textInput}/>
                <TextInput ref={input => { this.answerInput = input }}  maxlength="15" onChangeText={(text) => this.setState({answer: text})} placeholder="Answer" style={styles.textInput}/>
                <TouchableOpacity style={styles.submitBtn} onPress={() => this.submit(this.state.question, this.state.answer)}>
                        <Text style={{color: white, textAlign: 'center'}}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
      );
    }
  }

const styles =  StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch'     
      },
      textInput: {
        margin: 15, 
        height: 40,
        width: 350,
        borderColor: 'gray', 
        borderWidth: 1
      },
      submitBtn: {
        padding: 20,
        width: 100,
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
  
  function mapDispatchToProps (dispatch, { navigation }) {
    const { deckId } = navigation.state.params
  
    return {
      addCard: (deck, card) => dispatch(addCard(deck, card)),
      goBack: () => navigation.goBack()
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(AddCard);