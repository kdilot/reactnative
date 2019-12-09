import React, { Component } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import InputBox from "components/slice/InputBox";
import Buttons from "components/slice/Buttons";
import { SignUp } from "api";
import { DefaultContainerStyle, DefaultViewStyle } from "constants/Style";

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.navigation.state.params.email,
            name: null,
            password: null,
            conPassword: null
        };
    }

    _navRegister = async () => {
        const { email, name, password, conPassword } = this.state;
        if (!name || !password || !conPassword) {
            Alert.alert("입력값을 확인하세요");
        } else if (password !== conPassword) {
            Alert.alert("패스워드가 다릅니다.");
        } else {
            let param = {};
            param.email = email;
            param.name = name;
            param.password = password;
            await SignUp(param).then(async res => {
                if (res.code === 200) {
                    Alert.alert("가입이 완료되었습니다.");
                    await this.props.navigation.navigate("SignIn");
                } else if (res.code === 500)
                    Alert.alert("가입에 실패하였습니다.");
            });
        }
    };

    render() {
        const { name, password, conPassword } = this.state;
        return (
            <KeyboardAvoidingView
                style={DefaultContainerStyle}
                behavior="padding"
                enabled
            >
                <View style={DefaultViewStyle}>
                    <InputBox
                        label={"Name"}
                        value={name}
                        onChange={name => this.setState({ name })}
                    />
                    <InputBox
                        label={"Password"}
                        secure={true}
                        value={password}
                        onChange={password => this.setState({ password })}
                    />
                    <InputBox
                        label={"Confirm Password"}
                        secure={true}
                        value={conPassword}
                        onChange={conPassword => this.setState({ conPassword })}
                    />
                    <View style={styles.btnGroup}>
                        <View style={styles.btnChild}>
                            <Buttons
                                label={"Back"}
                                onPress={() =>
                                    this.props.navigation.navigate("SignIn")
                                }
                            />
                        </View>
                        <View style={styles.btnChild}>
                            <Buttons
                                label={"Register"}
                                onPress={() => this._navRegister()}
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

export default SignUpPage;
