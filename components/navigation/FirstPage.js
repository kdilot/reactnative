import React, { Component } from "react";
import { Text, View } from "react-native";
import SkeletonLoader from "../skeletonloader/SkeletonLoader";
import LoadingPage from "../skeletonloader/LoadingPage";

export default class FirstPage extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <LoadingPage />
            </View>
        );
    }
}
