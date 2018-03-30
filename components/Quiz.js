import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Animated} from 'react-native';
import {connect} from 'react-redux'
import {red, green, white} from '../utils/colors'
import {clearLocalNotification, setLocalNotification} from '../utils/helpers'

class Quiz extends React.Component {
    state = {
        currentQuestion: 0,
        correctAnswers: 0
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
          this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg']
        })

        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
          })
          this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
          })
    }

    flipCard() {
        if (this.value >= 90) {
          Animated.spring(this.animatedValue,{
            toValue: 0,
            friction: 8,
            tension: 10
          }).start();
        } else {
          Animated.spring(this.animatedValue,{
            toValue: 180,
            friction: 8,
            tension: 10
          }).start();
        }
    }

    processQuestionResult(isCorrectAnswer) {
        this.setState({
            correctAnswers: isCorrectAnswer ? ++ this.state.correctAnswers :  this.state.correctAnswers,
            currentQuestion: ++this.state.currentQuestion
        });

        clearLocalNotification()
            .then(setLocalNotification)
    }

    render() {
        const frontAnimatedStyle = {
            transform: [
              { rotateY: this.frontInterpolate}
            ]
          }
          const backAnimatedStyle = {
            transform: [
              { rotateY: this.backInterpolate }
            ]
          }
        const {deckId, deck} =  this.props;
        const {questions} = deck;
        const {currentQuestion, correctAnswers} = this.state;
        const isQuizEnd =  currentQuestion >= questions.length;

        return (
            <View style={styles.container}>
                {!isQuizEnd ?
                    <View>
                        <View style={{flex: 1, alignItems: 'flex-start', marginBottom:100}}>
                            <Text>{currentQuestion + 1} / {questions.length}</Text>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
                                <Text style={{fontSize:50}}>{questions[currentQuestion].question}</Text>
                                <TouchableOpacity onPress={() => this.flipCard()}>
                                    <Text style={styles.questionLabel}>Answer</Text>
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={[styles.flipCard, backAnimatedStyle, {opacity: this.backOpacity,  position: 'absolute', top: 0}]}>
                                <Text style={{fontSize:50}}>{questions[currentQuestion].answer}</Text>
                                    <TouchableOpacity onPress={() => this.flipCard()}>
                                        <Text style={styles.questionLabel}>Question</Text>
                                    </TouchableOpacity>
                            </Animated.View>
                                           
                            <TouchableOpacity style={styles.correctBtn} onPress={()=> this.processQuestionResult(true)}><Text style={{color: white, textAlign: 'center'}}>CORRECT</Text></TouchableOpacity>
                            <TouchableOpacity  style={styles.incorrectBtn} onPress={()=> this.processQuestionResult(false)}><Text style={{color: white, textAlign: 'center'}}>INCORRECT</Text></TouchableOpacity>
                        </View>
                    </View>
                :    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                       <Text style={{fontSize:50}}>Congrats, you have finished the quiz. Your score is {(correctAnswers / questions.length) * 100} %</Text>
                       <TouchableOpacity style={styles.correctBtn} onPress={()=> this.props.navigation.navigate('Quiz',{deckId: deckId})}><Text style={{color: white, textAlign: 'center'}}>Restart Quiz</Text></TouchableOpacity>
                       <TouchableOpacity style={styles.correctBtn} onPress={()=> this.props.navigation.navigate('DeckView', {deckId: deckId})}><Text style={{color: white, textAlign: 'center'}}>Back to Deck</Text></TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}

const styles =  StyleSheet.create({
    container: {
       flex: 1,
       alignItems: 'stretch',       
    },
    flipCard: {
       backfaceVisibility: 'hidden'
    },
    questionLabel: {
        textAlign:'center',
        color: red,
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    correctBtn: {
        padding: 20,
        width: 200,
        margin: 10,
        backgroundColor: green
    },
    incorrectBtn: {
        padding: 20,
        width: 200,
        margin: 2,
        backgroundColor: red
    }
})

function mapStateToProps (state, { navigation }) {
    const { deckId } = navigation.state.params
    return {
      deckId,
      deck: state[deckId]
    }
}

export default connect(mapStateToProps)(Quiz);