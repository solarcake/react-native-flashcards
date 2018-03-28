import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import AddCard from './components/AddCard'
import DeckView from './components/DeckView'
import Quiz from './components/Quiz'
import reducer  from './reducers'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {white, gray} from './utils/colors'
import {setLocalNotification} from './utils/helpers'

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <MainNavigator/>
      </Provider>
    );
  }
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DECKS'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK'
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: gray,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: gray,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: gray,
      }
    }
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
