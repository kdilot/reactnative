import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignUpPage from "components/login/SignUpPage";
import SignInPage from "components/login/SignInPage";
import FinishPage from "components/login/FinishPage";
import CodePage from "components/login/CodePage";

// const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
    createSwitchNavigator(
        {
            SignIn: SignInPage,
            SignUp: SignUpPage,
            LogOut: FinishPage,
            CodeCheck: CodePage
        },
        {
            initialRouteName: "SignIn"
        }
    )
);
