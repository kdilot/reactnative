import React, { Component } from "react";
import { View, Animated, TextInput, Text } from "react-native";

class FloatingLabelInput extends Component {
    state = {
        isFocused: false,
        animation: new Animated.Value(0),
        text: ""
    };

    _fadeIn() {
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: 150
            // easing : Easing.ease,
        }).start();
    }
    _fadeOut() {
        Animated.timing(this.state.animation, {
            toValue: 0,
            duration: 150
            // easing : Easing.ease,
        }).start();
    }

    handleFocus = () => {
        this.setState({ isFocused: true });
        this._fadeIn();
    };
    handleBlur = () => {
        this.setState({ isFocused: false });
        if (!this.state.text) this._fadeOut();
    };

    render() {
        const { label, ...props } = this.props;
        const { isFocused } = this.state;

        const animationStyles = {
            // transform: [{ translateY: this.state.animation }],
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
        const labelStyle = {
            position: "absolute",
            left: 0,
            fontSize: 20,
            color: !isFocused ? "#aaa" : "#aaa"
        };
        return (
            <View style={{ paddingTop: 18 }}>
                <Animated.Text style={[labelStyle, animationStyles]}>
                    {label}
                </Animated.Text>
                <TextInput
                    {...props}
                    style={{
                        height: 26,
                        fontSize: 20,
                        color: "#000",
                        borderBottomWidth: 1,
                        borderBottomColor: "#555"
                    }}
                    onChangeText={text => this.setState({ text })}
                    value={this.state.text}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
            </View>
        );
    }
}

export default class InputText extends Component {
    state = {
        value: ""
    };

    handleTextChange = newText => this.setState({ value: newText });

    render() {
        return (
            <FloatingLabelInput
                label="Email"
                value={this.state.value}
                onChangeText={this.handleTextChange}
            />
        );
    }
}
