import React, { Component } from "react";
import { Dimensions, View, Text, StyleSheet, Button } from "react-native";

class FinishPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Finish</Text>
            </View>
        );
    }
}

export default FinishPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
