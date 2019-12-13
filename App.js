import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { StyleSheet } from "react-native";
import LoginNavigator from "components/navigation/LoginNavigator";
import SkeletonLoader from "components/skeletonloader/SkeletonLoader";
import InfiniteLoop from "./test/InfiniteLoop";
import HomeScreen from "screens/HomeScreen";
import ScrollEvent from "screens/ScrollEventScreen/ScrollEvent";
import ImageLazyScreen from "screens/ImageLazyScreen";
import PinLayout from "screens/PinCodeScreen/PinLayout";

HomeScreen.navigationOptions = ({ navigation, screenProps }) => ({
    // header: null,
    title: "Home",
    headerTitleStyle: {
        ...styles.naviStyle
    }
});
LoginNavigator.navigationOptions = ({ navigation, screenProps }) => ({
    // header: null,
    title: "Login",
    headerTitleStyle: {
        ...styles.naviStyle
    }
});
ScrollEvent.navigationOptions = ({ navigation, screenProps }) => ({
    // header: null,
    title: "Scroll Event",
    headerTitleStyle: {
        ...styles.naviStyle
    }
});
InfiniteLoop.navigationOptions = ({ navigation, screenProps }) => ({
    // header: null,
    title: "Infinite Loop",
    headerTitleStyle: {
        ...styles.naviStyle
    }
});
SkeletonLoader.navigationOptions = ({ navigation, screenProps }) => ({
    // header: null,
    title: "Skeleton Loader",
    headerTitleStyle: {
        ...styles.naviStyle
    }
});
ImageLazyScreen.navigationOptions = ({ navigation, screenProps }) => ({
    // header: null,
    title: "Image Lazy Loading",
    headerTitleStyle: {
        ...styles.naviStyle
    }
});
PinLayout.navigationOptions = ({ navigation, screenProps }) => ({
    // header: null,
    title: "PIN Code",
    headerTitleStyle: {
        ...styles.naviStyle
    }
});

//making a StackNavigator to export as default
const App = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Login: {
        screen: LoginNavigator
    },
    Infinite: {
        screen: InfiniteLoop
    },
    Skeleton: {
        screen: SkeletonLoader
    },
    ImageLazy: {
        screen: ImageLazyScreen
    },
    Scroll: {
        screen: ScrollEvent
    },
    PinCode: {
        screen: PinLayout
    }
});

export default createAppContainer(App);

const styles = StyleSheet.create({
    naviStyle: {
        alignItems: "center",
        justifyContent: "center"
    }
});
