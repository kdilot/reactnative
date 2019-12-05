import React, { Component } from "react";
import {
    Alert,
    AsyncStorage,
    KeyboardAvoidingView,
    StyleSheet,
    View,
} from "react-native";
import InputBox from "components/slice/InputBox";
import Buttons from "components/slice/Buttons";
import { SignIn } from "api";
import { regEmail } from "constants/Reg";
import { DefaultContainerStyle, DefaultViewStyle } from "constants/Style";

class SignInPage extends Component {
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

    _setToken = async token => {
        await AsyncStorage.setItem("userToken", token);
    };

    _navSignIn = () => {
        const { email, password } = this.state;
        if (!email || !regEmail.exec(email)) {
            Alert.alert("이메일 값을 확인하세요");
        } else if (!password) {
            Alert.alert("비밀번호 값을 확인하세요");
        } else {
            let param = {};
            param.email = email;
            param.password = password;
            SignIn(param).then(async res => {
                if (res.code === 200) {
                    await this._setToken(res.token);
                    await this._getToken();
                } else if (res.code === 500)
                    Alert.alert("로그인에 실패하였습니다.");
            });
        }
    };
    _navSignUp = () => {
        this.props.navigation.navigate("CodeCheck");
    };

    render() {
        const { email, password } = this.state;
        return (
            <KeyboardAvoidingView
                style={DefaultContainerStyle}
                behavior="padding"
                enabled
            >
                <View style={DefaultViewStyle}>
                    <InputBox
                        label={"E-mail"}
                        value={email}
                        keyboardType={"email-address"}
                        onChange={email => this.setState({ email })}
                    />
                    <InputBox
                        label={"Password"}
                        secure={true}
                        value={password}
                        onChange={password => this.setState({ password })}
                    />
                    <View style={styles.btnGroup}>
                        <View style={styles.btnChild}>
                            <Buttons
                                label={"Sign up"}
                                onPress={() => this._navSignUp()}
                            />
                        </View>
                        <View style={styles.btnChild}>
                            <Buttons
                                label={"Sign in"}
                                onPress={() => this._navSignIn()}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    btnGroup: {
        flexDirection: "row",
        marginTop: 10
    },
    btnChild: {
        width: "50%",
        padding: 5
    }
});

export default SignInPage;
