import React, { Component } from "react";
import {
    AsyncStorage,
    Alert,
    Dimensions,
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

class MainPage extends Component {
    state = {
        token: false
    };
    componentDidMount() {
        this._getToken();
    }

    _getToken = async () => {
        await AsyncStorage.getItem("userToken").then(token =>
            this.setState({ token })
        );
    };

    _signOut = async () => {
        await AsyncStorage.clear().then(res => this.setState({ token: false }));
        if (!this.state.token) {
            this.props.navigation.navigate("Welcome");
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttons}>
                    {this.state.token ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <View style={styles.btn}>
                                <Button
                                    title="Sign in"
                                    onPress={() =>
                                        this.props.navigation.navigate("SignIn")
                                    }
                                />
                            </View>
                            {/* <View style={styles.btn}>
                <Button title="Sign up" />
              </View> */}
                        </>
                    )}
                </View>
            </View>
        );
    }
}

export default MainPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttons: {
        padding: 10,
        width: Dimensions.get("window").width
    },
    btn: {
        margin: 5
    }
});
