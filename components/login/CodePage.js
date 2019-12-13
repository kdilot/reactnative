import React, { Component } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Alert } from "react-native";
import InputBox from "components/slice/InputBox";
import Buttons from "components/slice/Buttons";
import { DefaultContainerStyle, DefaultViewStyle } from "constants/Style";
import { EmailVal, CodeVal } from "api";
import { TextField } from "react-native-material-textfield";

class FinishPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            certValue: null,
            veriFlag: false,
            email: null,
            error: {}
        };
    }

    _sendCode = async () => {
        const { email } = this.state;
        let error = {};
        if (!email) {
            error["email"] = "이메일 값을 확인하세요...";
        } else {
            this.setState({ veriFlag: true });
            let param = {};
            param.email = email;
            await EmailVal(param).then(async res => {
                if (res.code === 200) {
                    Alert.alert("코드 전송이 완료되었습니다.");
                } else if (res.code === 500)
                    Alert.alert("이메일 인증에 실패하였습니다.");
            });
        }
        setState({ error });
    };

    _verifyCode = async () => {
        const { email, certValue } = this.state;
        let error = {};
        if (!certValue) {
            error["email"] = "코드 값을 확인하세요...";
        } else {
            let param = {};
            param.email = email;
            param.certValue = certValue;
            await CodeVal(param).then(async res => {
                if (res.code === 200) {
                    this.props.navigation.navigate("SignUp", { email });
                } else if (res.code === 500)
                    Alert.alert("코드 인증에 실패하였습니다.");
            });
        }
        setState({ error });
    };

    _resetError = () => {
        this.setState({ error: {} });
    };

    render() {
        const { certValue, email, veriFlag, error } = this.state;
        return (
            <KeyboardAvoidingView
                style={DefaultContainerStyle}
                behavior="padding"
                enabled
            >
                <View style={DefaultViewStyle}>
                    {!veriFlag ? (
                        <View style={styles.veriContainer}>
                            <View style={styles.inputLayout}>
                                <TextField
                                    label="E-mail"
                                    keyboardType={"email-address"}
                                    onFocus={() => this._resetError()}
                                    error={error.email}
                                    onChangeText={email =>
                                        this.setState({ email })
                                    }
                                />
                                {/* <InputBox
                                    label={"E-mail"}
                                    value={email}
                                    keyboardType={"email-address"}
                                    onChange={email => this.setState({ email })}
                                /> */}
                            </View>
                            <View style={styles.buttonLayout}>
                                <Buttons
                                    label={"Send Code"}
                                    onPress={() => this._sendCode()}
                                />
                            </View>
                        </View>
                    ) : (
                        <View style={styles.veriContainer}>
                            <View style={styles.inputLayout}>
                                <TextField
                                    label="Code"
                                    keyboardType={"numeric"}
                                    onFocus={() => this._resetError()}
                                    error={error.certValue}
                                    onChangeText={certValue =>
                                        this.setState({ certValue })
                                    }
                                />
                                {/* <InputBox
                                    label={"Code"}
                                    value={certValue}
                                    keyboardType={"numeric"}
                                    onChange={certValue =>
                                        this.setState({ certValue })
                                    }
                                /> */}
                            </View>
                            <View style={styles.buttonLayout}>
                                <Buttons
                                    label={"Verify"}
                                    onPress={() => this._verifyCode()}
                                />
                            </View>
                        </View>
                    )}
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    veriContainer: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
    inputLayout: {
        width: "70%",
        paddingRight: 10
    },
    buttonLayout: {
        width: "30%",
        marginBottom: 8
    }
});

export default FinishPage;
