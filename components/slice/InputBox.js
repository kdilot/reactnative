import React, { Component } from "react";
import { Animated, View, TextInput, StyleSheet } from "react-native";

class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: new Animated.Value(0)
        };
    }
    _fadeIn = value => {
        if (!value) {
            Animated.timing(this.state.animation, {
                toValue: 1,
                duration: 150
            }).start();
        }
    };
    _fadeOut = value => {
        if (!value) {
            Animated.timing(this.state.animation, {
                toValue: 0,
                duration: 150
            }).start();
        }
    };
    render() {
        const { label, secure, value, onChange } = this.props;
        const placeholderStyles = {
            top: this.state.animation.interpolate({
                inputRange: [0.2, 1],
                outputRange: [16, 0]
            }),
            fontSize: this.state.animation.interpolate({
                inputRange: [0, 0.1, 0.2, 1],
                outputRange: [20, 17, 14, 14]
            }),
            color: this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: ["#aaa", "green"]
            })
        };
        const inputBoxStyles = {
            borderBottomColor: this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: ["#555", "green"]
            }),
            borderBottomWidth: this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1]
            })
        };
        return (
            <View style={styles.container}>
                <Animated.Text
                    style={[styles.placeholderStyle, placeholderStyles]}
                >
                    {label}
                </Animated.Text>
                <Animated.View style={[styles.inputStyle, inputBoxStyles]}>
                    <TextInput
                        style={styles.textStyle}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={secure}
                        onFocus={() => this._fadeIn(value)}
                        onBlur={() => this._fadeOut(value)}
                    />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 18,
        marginBottom: 10
    },
    placeholderStyle: {
        position: "absolute",
        left: 0,
        fontSize: 20
    },
    textStyle: {
        height: 26,
        fontSize: 20,
        color: "#000"
    }
});

export default InputBox;
