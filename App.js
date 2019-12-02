import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import FirstPage from './components/navigation/FirstPage'
import SecondPage from './components/navigation/SecondPage'
import LoginPage from './components/navigation/LoginPage'
import { Ionicons } from '@expo/vector-icons'

const TabScreen = createMaterialTopTabNavigator(
  {
    Login: {
      screen: LoginPage,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => <Ionicons name="md-mail" size={30} color={focused ? 'red' : 'white'} />
      }
    },
    Home: {
      screen: FirstPage,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => <Ionicons name="md-home" size={30} color={focused ? 'red' : 'white'} />
      }
    },
    Settings: {
      screen: SecondPage,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => <Ionicons name="md-alert" size={30} color={focused ? 'red' : 'white'} />
      }
    }
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: 'red',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: '#633689'
      },
      labelStyle: {
        textAlign: 'center'
      },
      indicatorStyle: {
        borderBottomColor: '#633689',
        borderBottomWidth: 2
      },
      tabStyle: {
        marginBottom: 5
      }
    }
  }
)

TabScreen.navigationOptions = ({ navigation, screenProps }) => ({
  // header: null,
  headerStyle: {
    backgroundColor: '#633689'
  },
  headerTintColor: '#FFFFFF',
  title: 'TabExample',
  headerTitleContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerLeft: (
    <Ionicons name="md-menu" size={32} color={'white'} />
  ),
  headerLeftContainerStyle: { marginLeft: 10 },
  headerRight: (
    <Ionicons name="md-search" size={32} color={'white'} />
  ),
  headerRightContainerStyle: { marginRight: 10 }
})

//making a StackNavigator to export as default
const App = createStackNavigator({
  TabScreen: {
    screen: TabScreen
  }
})
export default createAppContainer(App)
