import React, { Component } from "react";
import {
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    StyleSheet,
    View,
} from "react-native";
import InputBox from "../slice/InputBox";
import Buttons from "../slice/Buttons";
import { SignUp } from "../../api";

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            name: null,
            password: null,
            conPassword: null,
            disabled: false
        };
    }

    _navRegister = () => {
        const { email, name, password, conPassword, disabled } = this.state;
        this.setState({ disabled: !disabled });
        if (!email || !name || !password || !conPassword) {
            Alert.alert("입력값을 확인하세요");
        } else if (password !== conPassword) {
            Alert.alert("패스워드가 다릅니다.");
        } else {
            let param = {};
            param.email = email;
            param.name = name;
            param.password = password;
            SignUp(param).then(res => {
                if (res.code === 200) {
                    this.props.navigation.navigate("SignIn");
                } else if (res.code === 500)
                    Alert.alert("가입에 실패하였습니다.");
            });
        }
        this.setState({ disabled: !disabled });
    };

    render() {
        const { email, name, password, conPassword } = this.state;
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
                    <Buttons
                        label={"Register"}
                        onPress={() => this._navRegister()}
                    />
                    <Buttons
                        label={"Go back"}
                        onPress={() => this.props.navigation.navigate("SignIn")}
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

export default SignUpPage;
