import React, { Component } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import InputBox from "components/slice/InputBox";
import Buttons from "components/slice/Buttons";
import { SignUp } from "api";
import { DefaultContainerStyle, DefaultViewStyle } from "constants/Style";
import { TextField } from "react-native-material-textfield";

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.navigation.state.params.email,
            name: null,
            password: null,
            conPassword: null,
            error: {},
            pwFlag: true,
            cpwFlag: true
        };
    }

    _navRegister = async () => {
        const { email, name, password, conPassword } = this.state;
        let error = {};
        if (!name) {
            error["name"] = "이름 값을 확인하세요...";
        } else if (!password) {
            error["password"] = "패스워드 값을 확인하세요...";
        } else if (!conPassword) {
            error["conPassword"] = "확인 패스워드 값을 확인하세요...";
        } else if (password !== conPassword) {
            error["conPassword"] = "패스워드 값이 일치하지 않습니다";
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
        this.setState({ error });
    };

    _resetError = () => {
        this.setState({ error: {} });
    };

    _secureEntry = pw => {
        const { flag } = this.state;
        return (
            <PasswordHideView
                flag={flag}
                onPress={() => {
                    this._hidePassword(pw);
                }}
            />
        );
    };

    _hidePassword = pw => {
        const { pwFlag, cpwFlag } = this.state;
        pw
            ? this.setState({ pwFlag: !pwFlag })
            : this.setState({ cpwFlag: !cpwFlag });
    };

    render() {
        const { name, password, conPassword, pwFlag, cpwFlag } = this.state;
        return (
            <KeyboardAvoidingView
                style={DefaultContainerStyle}
                behavior="padding"
                enabled
            >
                <View style={DefaultViewStyle}>
                    <TextField
                        label="Name"
                        keyboardType="default"
                        onFocus={() => this._resetError()}
                        error={error.email}
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextField
                        label="Password"
                        onFocus={() => this._resetError()}
                        error={error.password}
                        secureTextEntry={pwFlag}
                        renderRightAccessory={this._secureEntry(true)}
                        onChangeText={password => this.setState({ password })}
                    />
                    <TextField
                        label="Confirm Password"
                        onFocus={() => this._resetError()}
                        error={error.conPassword}
                        secureTextEntry={cpwFlag}
                        renderRightAccessory={this._secureEntry()}
                        onChangeText={conPassword =>
                            this.setState({ conPassword })
                        }
                    />
                    {/* <InputBox
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
                    /> */}
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
