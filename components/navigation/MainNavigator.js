import React from "react";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import FirstNavigator from "components/navigation/FirstNavigator";
import SecondNavigator from "components/navigation/SecondNavigator";
import LoginNavigator from "components/navigation/LoginNavigator";
import ScrollEvent from "components/scrollevent/ScrollEvent";
import { Ionicons } from "@expo/vector-icons";
import { MainColor, ActiveColor } from "constants/Color";

const TabScreen = createMaterialTopTabNavigator(
    {
        Login: {
            screen: ScrollEvent,
            // screen: LoginNavigator,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => (
                    <Ionicons
                        name="md-apps"
                        size={30}
                        color={focused ? ActiveColor : "white"}
                    />
                )
            }
        },
        Home: {
            screen: FirstNavigator,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => (
                    <Ionicons
                        name="md-home"
                        size={30}
                        color={focused ? ActiveColor : "white"}
                    />
                )
            }
        },
        Settings: {
            screen: SecondNavigator,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => (
                    <Ionicons
                        name="md-alert"
                        size={30}
                        color={focused ? ActiveColor : "white"}
                    />
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
            activeTintColor: ActiveColor,
            inactiveTintColor: "#F8F8F8",
            style: {
                backgroundColor: MainColor
            },
            labelStyle: {
                textAlign: "center"
            },
            indicatorStyle: {
                borderBottomColor: MainColor,
                borderBottomWidth: 2
            },
            tabStyle: {
                marginBottom: 5
            }
        }
    }
);

TabScreen.navigationOptions = ({ navigation, screenProps }) => ({
    // header: null,
    headerStyle: {
        backgroundColor: MainColor
    },
    headerTintColor: "#FFFFFF",
    title: "TabExample",
    headerTitleContainerStyle: {
        alignItems: "center",
        justifyContent: "center"
    },
    headerLeft: <Ionicons name="md-menu" size={32} color={"white"} />,
    headerLeftContainerStyle: { marginLeft: 10 },
    headerRight: <Ionicons name="md-search" size={32} color={"white"} />,
    headerRightContainerStyle: { marginRight: 10 }
});

//making a StackNavigator to export as default
const MainNavigator = createStackNavigator({
    TabScreen: {
        screen: TabScreen
    }
});
export default createAppContainer(MainNavigator);
