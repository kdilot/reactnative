import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class WebviewLoading extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.msg}> Loading... </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    msg: {
        fontSize: 30,
        fontWeight: "bold"
    }
});
