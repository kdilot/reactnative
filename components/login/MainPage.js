import React, { Component } from "react";
import {
    AsyncStorage,
    Alert,
    Dimensions,
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    KeyboardAvoidingView
} from "react-native";
import { Akira } from "react-native-textinput-effects";
import InputText from "./InputText";

class MainPage extends Component {
    componentDidMount() {
        this._getToken();
    }

    _getToken = async () => {
        await AsyncStorage.getItem("userToken").then(token =>
            this.setState({ token })
        );
    };

    _nextStep = () => {
        const { email, name, password, conPassword } = this.state;
        if (!email || !name || !password || !conPassword) {
            Alert.alert("입력값을 확인하세요");
        } else if (password !== conPassword) {
            Alert.alert("패스워드가 다릅니다.");
        } else {
            let param = {};
            param.email = email;
            param.name = name;
            param.password = password;
            console.warn(param);
            this.props.navigation.navigate("SignIn");
        }
    };

    _signOut = async () => {
        const { token } = this.state;
        await AsyncStorage.clear().then(res => this.setState({ token: false }));
        if (!token) {
            this.props.navigation.navigate("Welcome");
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            token: false,
            email: "",
            name: "",
            password: "",
            conPassword: ""
        };
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                enabled
            >
                <View style={styles.buttons}>
                    {this.state.token ? (
                        <>
                            <View style={styles.inputBox}>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 30,
                                        marginBottom: 10
                                    }}
                                >
                                    Welcome User
                                </Text>
                                <View style={styles.btn}>
                                    <Button
                                        title="Sign out"
                                        onPress={() => this._signOut()}
                                    />
                                </View>
                            </View>
                        </>
                    ) : (
                        <>
                            <View style={styles.inputBox}>
                                <InputText />
                                <Akira
                                    label={"E-mail"}
                                    borderColor={"gray"}
                                    borderHeight={3}
                                    onChangeText={email => {
                                        this.setState({ email });
                                    }}
                                />
                                <Akira
                                    label={"Name"}
                                    borderColor={"gray"}
                                    borderHeight={3}
                                    onChangeText={name => {
                                        this.setState({ name });
                                    }}
                                />
                                <Akira
                                    label={"Password"}
                                    borderColor={"gray"}
                                    borderHeight={3}
                                    secureTextEntry={true}
                                    onChangeText={password => {
                                        this.setState({ password });
                                    }}
                                />
                                <Akira
                                    label={"Confirm Password"}
                                    borderColor={"gray"}
                                    borderHeight={3}
                                    secureTextEntry={true}
                                    onChangeText={conPassword => {
                                        this.setState({ conPassword });
                                    }}
                                />
                            </View>
                            <View style={styles.btn}>
                                <Button
                                    title="Sign in"
                                    onPress={() => this._nextStep()}
                                />
                            </View>
                        </>
                    )}
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default MainPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    inputBox: {
        padding: 10
    },
    buttons: {
        padding: 10,
        width: Dimensions.get("window").width
    },
    btn: {
        marginTop: 30,
        margin: 5
    }
});
