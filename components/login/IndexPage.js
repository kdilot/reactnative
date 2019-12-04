import React, { Component } from "react";
import {
    Alert,
    AsyncStorage,
    Dimensions,
    KeyboardAvoidingView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from "react-native";
import InputBox from "../slice/InputBox";
import Buttons from "../slice/Buttons";
import { SignIn } from "../../api";

class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            name: null,
            password: null,
            conPassword: null
        };
    }

    _getToken = async () => {
        await AsyncStorage.getItem("userToken")
            .then(res => {
                this.props.navigation.navigate("LogOut");
            })
            .catch(e => {
                Alert.alert("토큰생성에 실패하였습니다.");
            });
    };

    _setToken = async () => {
        const { email } = this.state;
        await AsyncStorage.setItem("userToken", email);
    };

    _navSignIn = () => {
        const { email, password } = this.state;
        if (!email || !password) {
            Alert.alert("입력값을 확인하세요");
        } else {
            let param = {};
            param.email = email;
            param.password = password;
            SignIn(param).then(async res => {
                if (res.code === 200) {
                    await this._setToken();
                    await this._getToken();
                } else if (res.code === 500)
                    Alert.alert("로그인에 실패하였습니다.");
            });
        }
    };
    _navSignUp = () => {
        this.props.navigation.navigate("SignUp");
    };

    render() {
        const { email, password } = this.state;
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                enabled
            >
                <View style={styles.group}>
                    <InputBox
                        label={"E-mail"}
                        value={email}
                        onChange={email => this.setState({ email })}
                    />
                    <InputBox
                        label={"Password"}
                        secure={true}
                        value={password}
                        onChange={password => this.setState({ password })}
                    />
                    <Buttons
                        label={"Sign in"}
                        onPress={() => this._navSignIn()}
                    />
                    <Buttons
                        label={"Sign up"}
                        onPress={() => this._navSignUp()}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    group: {
        padding: 10,
        width: Dimensions.get("window").width
    }
});

export default IndexPage;
