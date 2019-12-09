import React, { Component } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Alert } from "react-native";
import InputBox from "components/slice/InputBox";
import Buttons from "components/slice/Buttons";
import { DefaultContainerStyle, DefaultViewStyle } from "constants/Style";
import { EmailVal, CodeVal } from "../../api";

class FinishPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            certValue: null,
            veriFlag: false,
            email: null
        };
    }

    _sendCode = async () => {
        // 이곳에 이메일 요청 API 호출
        // 이곳에 코드 요청 API 호출
        const { email } = this.state;
        if (!email) {
            Alert.alert("입력값을 확인하세요");
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
    };

    _verifyCode = async () => {
        const { email, certValue } = this.state;
        // 이곳에 코드 검증 API 호출
        if (!certValue) {
            Alert.alert("입력값을 확인하세요");
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
    };

    componentDidMount() {
        // this._getToken();
    }

    render() {
        const { certValue, email, veriFlag } = this.state;
        return (
            <KeyboardAvoidingView
                style={DefaultContainerStyle}
                behavior="padding"
                enabled
            >
                <View style={DefaultViewStyle}>
                    {!veriFlag ? (
                        <View style={styles.veriContainer}>
                            <View style={{ width: "70%", paddingRight: 10 }}>
                                <InputBox
                                    label={"E-mail"}
                                    value={email}
                                    keyboardType={"email-address"}
                                    onChange={email => this.setState({ email })}
                                />
                            </View>
                            <View style={{ width: "30%" }}>
                                <Buttons
                                    label={"Send Code"}
                                    onPress={() => this._sendCode()}
                                />
                            </View>
                        </View>
                    ) : (
                        <View style={styles.veriContainer}>
                            <View style={{ width: "70%", paddingRight: 10 }}>
                                <InputBox
                                    label={"Code"}
                                    value={certValue}
                                    keyboardType={"numeric"}
                                    onChange={certValue =>
                                        this.setState({ certValue })
                                    }
                                />
                            </View>
                            <View style={{ width: "30%" }}>
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
        height: 200,
        alignItems: "center"
    }
});

export default FinishPage;
