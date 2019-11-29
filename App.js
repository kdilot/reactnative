import React from "react";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import FirstPage from "./components/navigation/FirstPage";
import SecondPage from "./components/navigation/SecondPage";
import { Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TabScreen = createMaterialTopTabNavigator(
  {
    Home: {
      screen: FirstPage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-home" size={25} color="white" />
        )
      }
    },
    Settings: {
      screen: SecondPage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-alert" size={25} color="white" />
        )
      }
    }
  },
  {
    tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: "red",
      inactiveTintColor: "#F8F8F8",
      style: {
        backgroundColor: "#633689"
      },
      labelStyle: {
        textAlign: "center"
      },
      indicatorStyle: {
        borderBottomColor: "red",
        borderBottomWidth: 2
      }
    }
  }
);

TabScreen.navigationOptions = ({ navigation, screenProps }) => ({
  headerStyle: {
    backgroundColor: "#633689"
  },
  headerTintColor: "#FFFFFF",
  title: "TabExample",
  headerLeft: (
    <Ionicons
      name="md-menu"
      size={32}
      color={"white"}
      style={{ marginLeft: 10 }}
    />
    // <Button
    //   title="Menu"
    //   onPress={navigation => {
    //     navigation.navigate("DrawerOpen");
    //   }}
    // />
  ),
  headerRight: (
    <Ionicons
      name="md-search"
      size={32}
      color={"white"}
      style={{ marginRight: 10 }}
    />
    // <Button
    //   title="Menu"
    //   onPress={navigation => {
    //     navigation.navigate("DrawerOpen");
    //   }}
    // />
  )
});

//making a StackNavigator to export as default
const App = createStackNavigator({
  TabScreen: {
    screen: TabScreen
  }
});
export default createAppContainer(App);
