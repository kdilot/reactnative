import React, { Component } from "react";
import {
    Animated,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { ActiveColor, FontColor } from "constants/Color";
import { Ionicons } from "@expo/vector-icons";

class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: new Animated.Value(0),
            hideFlag: true
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

    _hideShow = () => {
        const { hideFlag } = this.state;
        this.setState({ hideFlag: !hideFlag });
    };

    render() {
        const { label, secure, value, onChange, keyboardType } = this.props;
        const { hideFlag } = this.state;
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
                outputRange: [FontColor, ActiveColor]
            })
        };
        const inputBoxStyles = {
            borderBottomColor: this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [FontColor, ActiveColor]
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
                        secureTextEntry={secure && hideFlag}
                        keyboardType={keyboardType}
                        onFocus={() => this._fadeIn(value)}
                        onBlur={() => this._fadeOut(value)}
                    />
                    {secure && (
                        <TouchableOpacity
                            style={{ position: "absolute", right: 0 }}
                            onPress={() => {
                                this._hideShow();
                            }}
                        >
                            <Ionicons
                                name={`md-${hideFlag ? `lock` : `unlock`}`}
                                size={22}
                                color={ActiveColor}
                            />
                        </TouchableOpacity>
                    )}
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
        color: FontColor,
        fontSize: 20
    },
    textStyle: {
        height: 26,
        fontSize: 20,
        color: FontColor
    }
});

export default InputBox;
