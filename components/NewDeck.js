import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {saveDeckTitle} from '../utils/api'
import {connect} from 'react-redux'
import {addDeck} from '../actions'
import {black, white} from '../utils/colors'

class NewDeck extends React.Component {
    state = {
       title: null
   }

    submit(title) {
        return saveDeckTitle(title).then((deck) => {
            return this.props.dispatch(addDeck(deck));
        }).then(()=> {
            Alert.alert(
                'Deck message',
                'New Deck has been added',
                [
                  {text: 'Go to Deck List', onPress: () => {
                      this.titleInput.clear()
                      this.props.navigation.navigate('DeckList')
                  }},
                  {text: 'Add More Decks', onPress: () => this.titleInput.clear()},
                ],
                { cancelable: false }
            )
        });
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 40, fontWeight: 'bold'}}>What is the title of your new deck</Text>
          <TextInput ref={input => { this.titleInput = input }} maxlength="15" onChangeText={(text) => this.setState({title: text})} placeholder="Deck Title" style={styles.textInput}/>
          <TouchableOpacity style={styles.submitBtn} onPress={() => this.submit(this.state.title)}>
                <Text style={{color: white, textAlign: 'center'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

const styles =  StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'        
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

export default connect()(NewDeck);