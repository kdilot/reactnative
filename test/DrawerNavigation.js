import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';
import Colors from '../constants/Colors';
import DrawerMenu from "../components/DrawerMenu";
import AlertScreen from "../screens/AlertScreen";
import CardScreen from "../screens/CardScreen";
import DrawerHomeScreen from "../screens/DrawerHomeScreen";
import SearchScreen from "../screens/SearchScreen";
import SettingScreen from "../screens/SettingScreen";
import StoreScreen from "../screens/StoreScreen";

export default class DrawerNavigation extends Component {
  render() {
    return <AppContainer />;
  }
}

const BackIcon = (navigation) => {
  return (
    <Ionicons
      name={'ios-arrow-back'}
      color={Colors.mainColor}
      size={30}
      onPress={() => navigation.navigate('Home')}
      style={{ width: '100%', paddingLeft: 20 }}
    />
  )
}

const HomeStackNavigator = createStackNavigator(
  {
    HomeNavigator: DrawerHomeScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons
            name={'md-menu'}
            color={Colors.mainColor}
            size={30}
            onPress={() => navigation.openDrawer()}
            style={{ width: '100%', paddingLeft: 20 }}
          />
        ),
      };
    }
  }
);

const SearchStackNavigator = createStackNavigator(
  {
    SearchNavigator: SearchScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <BackIcon {...navigation} />
        )
      };
    }
  }
);

const StoreStackNavigator = createStackNavigator(
  {
    StoreNavigator: StoreScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <BackIcon {...navigation} />
        )
      };
    }
  }
);

const AlertStackNavigator = createStackNavigator(
  {
    AlertNavigator: AlertScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <BackIcon {...navigation} />
        )
      };
    }
  }
);

const SettingStackNavigator = createStackNavigator(
  {
    SettingNavigator: SettingScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <BackIcon {...navigation} />
        )
      };
    }
  }
);

const CardStackNavigator = createStackNavigator(
  {
    CardNavigator: CardScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <BackIcon {...navigation} />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStackNavigator,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-home" style={{ color: tintColor }} size={30} />
      )
    }
  },
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-search" style={{ color: tintColor }} size={30} />
      )
    }
  },
  Store: {
    screen: StoreStackNavigator,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-appstore" style={{ color: tintColor }} size={30} />
      )
    }
  },
  Alert: {
    screen: AlertStackNavigator,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-alert" style={{ color: tintColor }} size={30} />
      )
    }
  },
  Setting: {
    screen: SettingStackNavigator,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-settings" style={{ color: tintColor }} size={30} />
      )
    }
  },
  News: {
    screen: CardStackNavigator,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-card" style={{ color: tintColor }} size={30} />
      )
    }
  },
}, {
  contentComponent: DrawerMenu,
  contentOptions: {
    iconContainerStyle: {
      width: 40,
      opacity: 1
    },
    itemsContainerStyle: {
      opacity: 1
    },
    activeTintColor: '#ffffff',
    inactiveTintColor: Colors.mainColor,

    activeBackgroundColor: Colors.mainColor,
    inactiveBackgroundColor: '#ffffff',
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Home: { screen: AppDrawerNavigator },
  Search: { screen: SearchScreen },
  Store: { screen: StoreScreen },
  Alert: { screen: AlertScreen },
  Setting: { screen: SettingScreen },

});

const AppContainer = createAppContainer(AppSwitchNavigator);