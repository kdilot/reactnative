import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

class Buttons extends Component {
    render() {
        const { disabled, label, onPress } = this.props;
        return (
            <TouchableOpacity
                style={styles.container}
                activeOpacity={0.5}
                disabled={disabled}
                onPress={() => {
                    onPress && onPress();
                }}
            >
                <Text> {label} </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        margin: 10
    }
});

export default Buttons;
