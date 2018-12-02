import React from 'react'
import { Text, View, Platform, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { gray, white, purple, black } from './utils/colors'
import { createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from  'react-navigation'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'

function UdaciStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


const Tabs = createAppContainer(createMaterialTopTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
},
{
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : black,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}))

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  }
}))

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <UdaciStatusBar backgroundColor={black} barStyle="light-content" />
        <MainNavigator />
      </View>
    )
  }
}

