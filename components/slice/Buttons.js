import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

class Buttons extends Component {
    render() {
        const { label, onPress } = this.props;
        return (
            <TouchableOpacity
                style={styles.container}
                activeOpacity={0.5}
                onPress={() => {
                    onPress && onPress();
                }}
            >
                <Text style={styles.text}> {label} </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
    },
    text: {
        color: "black"
    }
});

export default Buttons;
