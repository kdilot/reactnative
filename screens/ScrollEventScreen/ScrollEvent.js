import React, { Component } from "react";
import { Text, View, Alert, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import ProgressView from "./ProgressView";
import WebviewLoading from "./WebviewLoading";

export default class ScrollEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxScrollHeight: 0,
            currentScrollHeight: 0,
            topBar: 0,
            endFlag: false
        };
    }

    _handleScroll = event => {
        const {
            currentScrollHeight,
            maxScrollHeight,
            topBar,
            endFlag
        } = this.state;

        //  스크롤 총 길이 값
        const maxHeight = Math.floor(
            event.nativeEvent.contentSize.height -
                event.nativeEvent.layoutMeasurement.height
        );

        if (maxScrollHeight !== maxHeight)
            this.setState({ maxScrollHeight: maxHeight });

        this.setState({
            currentScrollHeight: Math.floor(event.nativeEvent.contentOffset.y), //  현재 스크롤 위치
            topBar:
                currentScrollHeight > 0
                    ? Math.round((currentScrollHeight * 100) / maxScrollHeight)
                    : topBar
        });
        if (
            currentScrollHeight + 50 >= maxScrollHeight &&
            currentScrollHeight > 0 &&
            !endFlag
        ) {
            this.setState({ endFlag: true });
            Alert.alert("스크롤 마지막 위치!!");
        }
    };

    render() {
        const { topBar } = this.state;

        const styles = StyleSheet.create({
            container: {
                width: Dimensions.get("window").width,
                height: "100%"
            },
            topBarStyle: {
                borderColor: "#E64800",
                borderBottomWidth: 10,
                width: `${topBar}%`
            }
        });

        return (
            <View style={styles.container}>
                <ProgressView topBar={topBar} />
                <View style={styles.topBarStyle}></View>
                <WebView
                    renderLoading={() => <WebviewLoading />}
                    startInLoadingState={true}
                    onScroll={this._handleScroll}
                    source={{
                        uri:
                            "https://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=105&oid=018&aid=0004534925"
                    }}
                />
            </View>
        );
    }
}
