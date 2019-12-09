import React, { Component } from "react";
import { Text, View, Alert, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

export default class ScrollEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxScrollHeight: 0,
            currentScrollHeight: 0,
            topBar: 0,
            giveTokenFlag: false
        };
    }
    _handleScroll = event => {
        const {
            currentScrollHeight,
            maxScrollHeight,
            topBar,
            giveTokenFlag
        } = this.state;
        const maxHeight = Math.floor(
            event.nativeEvent.contentSize.height -
                event.nativeEvent.layoutMeasurement.height
        );
        const currentHeight = Math.floor(event.nativeEvent.contentOffset.y);
        if (maxScrollHeight !== maxHeight)
            this.setState({ maxScrollHeight: maxHeight });
        this.setState({
            currentScrollHeight: currentHeight,
            topBar:
                currentScrollHeight > 0
                    ? (currentScrollHeight * 100) / maxScrollHeight
                    : topBar
        });
        if (
            currentScrollHeight + 50 >= maxScrollHeight &&
            currentScrollHeight > 0 &&
            !giveTokenFlag
        ) {
            this.setState({ giveTokenFlag: true });
            Alert.alert("스크롤 마지막 위치!!");
        }
    };

    render() {
        const { topBar } = this.state;
        return (
            <View style={styles.container}>
                <View
                    style={{
                        borderColor: "red",
                        borderBottomWidth: 10,
                        width: `${topBar}%`
                    }}
                ></View>
                <WebView
                    onScroll={this._handleScroll}
                    source={{
                        uri: "https://github.com/facebook/react-native"
                    }}
                    style={{ marginTop: 20 }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        height: "100%"
    }
});
