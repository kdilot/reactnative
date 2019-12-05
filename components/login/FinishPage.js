import React, { Component } from "react";
import {
    AsyncStorage,
    View,
    Text,
    KeyboardAvoidingView
} from "react-native";
import Buttons from "components/slice/Buttons";
import { DefaultContainerStyle, DefaultViewStyle } from "constants/Style";

class FinishPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userToken: null
        };
    }
    _getToken = async () => {
        await AsyncStorage.getItem("userToken")
            .then(userToken => {
                if (!userToken) this.props.navigation.navigate("SignIn");
                else this.setState({ userToken });
            })
            .catch(e => {
                Alert.alert("토큰조회에 실패하였습니다.");
                this.props.navigation.navigate("SignIn");
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

    componentDidMount() {
        this._getToken();
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={DefaultContainerStyle}
                behavior="padding"
                enabled
            >
                <View style={DefaultViewStyle}>
                    <Text style={{ textAlign: "center" }}>
                        {this.state.userToken}
                    </Text>
                    <Buttons
                        label={"Sign out"}
                        onPress={() => this._navSignOut()}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         ...DefaultContainerStyle
//     }
// });

export default FinishPage;
