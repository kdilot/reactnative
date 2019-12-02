import React, { Component } from "react";
import {
    AsyncStorage,
    Alert,
    View,
    Text,
    TextInput,
    StyleSheet,
    Button
} from "react-native";

class SignInPage extends Component {
    state = {
        text: "",
        randomCode: Math.floor(1000 + Math.random() * 9000)
    };

    _codeCheck = async text => {
        if (text === this.state.randomCode.toString()) {
            await AsyncStorage.setItem("userToken", "abc");
            this.props.navigation.navigate("Welcome");
        } else {
            Alert.alert("Incorrect Code");
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.number}>{this.state.randomCode}</Text>
                <TextInput
                    style={styles.box}
                    keyboardType={"numeric"}
                    placeholder="Input Code"
                    onChangeText={text => this.setState({ text })}
                    value={this.state.text}
                    autoCompleteType="password"
                />
                <Button
                    title="OK"
                    onPress={() => {
                        this._codeCheck(this.state.text);
                    }}
                />
            </View>
        );
    }
}

export default SignInPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    number: {
        padding: 20,
        fontSize: 50,
        fontWeight: "bold"
    },
    box: {
        height: 40,
        textAlign: "center"
    }
});
