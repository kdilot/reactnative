import React, { Component } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import Buttons from "../slice/Buttons";

class FinishPage extends Component {
    constructor(props) {
        super(props);
        this.setate = {
            userToken: null
        };
    }
    _getToken = async () => {
        await AsyncStorage.getItem("userToken")
            .then(userToken => {
                this.setState({ userToken });
            })
            .catch(e => {
                Alert.alert("토큰조회에 실패하였습니다.");
            });
    };

    _navSignOut = async () => {
        await AsyncStorage.clear().then(() =>
            this.setState({ userToken: null })
        );
        if (!this.state.userToken) {
            this.props.navigation.navigate("SignIn");
        }
    };

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                enabled
            >
                <View style={styles.group}>
                    <Text>{this.state.userToken}</Text>
                    <Buttons
                        label={"Sign out"}
                        onPress={() => this._navSignOut()}
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

export default FinishPage;
