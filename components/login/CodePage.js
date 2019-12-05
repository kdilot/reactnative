import React, { Component } from "react";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView
} from "react-native";
import InputBox from "components/slice/InputBox";
import Buttons from "components/slice/Buttons";
import { DefaultContainerStyle, DefaultViewStyle } from "constants/Style";
// import { SignUp } from "../../api";

class FinishPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: null,
            veriFlag: false,
            email: null
        };
    }

    _sendCode = () => {
        const { code } = this.state;
        // 이곳에 이메일 요청 API 호출
        // 이곳에 코드 요청 API 호출
        this.setState({ veriFlag: true });
    };

    _verifyCode = () => {
        const { email } = this.state;
        // 이곳에 코드 검증 API 호출
        this.props.navigation.navigate("SignUp", { email });
    };

    componentDidMount() {
        // this._getToken();
    }

    render() {
        const { code, email, veriFlag } = this.state;
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
                                    value={code}
                                    keyboardType={"numeric"}
                                    onChange={code => this.setState({ code })}
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
