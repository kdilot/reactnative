import React, { Component } from "react";
import { View, Animated, TextInput, Text } from "react-native";

class FloatingLabelInput extends Component {
    state = {
        isFocused: false,
        value: new Animated.Value(0)
    };

    _fadeIn() {
        Animated.timing(this.state.value, {
            toValue: 1,
            duration: 1000,
            //easing : Easing.bounce,
            delay: 200
        }).start();
    }

    handleFocus = () => {
        this.setState({ isFocused: true });
        // this._fadeIn();
    };
    handleBlur = () => this.setState({ isFocused: false });

    render() {
        const { label, ...props } = this.props;
        const { isFocused } = this.state;
        const labelStyle = {
            position: "absolute",
            left: 0,
            top: !isFocused ? 18 : 0,
            fontSize: !isFocused ? 20 : 14,
            color: !isFocused ? "#aaa" : "#aaa",
        };
        return (
            <Animated.View style={{ paddingTop: 18 }}>
                <Text style={labelStyle}>{label}</Text>
                <TextInput
                    {...props}
                    style={{
                        height: 26,
                        fontSize: 20,
                        color: "#000",
                        borderBottomWidth: 1,
                        borderBottomColor: "#555"
                    }}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    blurOnSubmit
                />
            </Animated.View>
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
