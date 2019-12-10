import React, { Component } from "react";
import { Text, View, FlatList, Dimensions, Image } from "react-native";
import FastImage from "react-native-fast-image";
import files from "./image.json";

export default class ImageLazyScreen extends Component {
    render() {
        return (
            <View>
                <FlatList
                    data={files}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item }}
                            style={{
                                backgroundColor: "#e1e4e8",
                                width: Dimensions.get("window").width,
                                height: 200
                            }}
                        />
                        // <FastImage
                        //     style={{
                        //         width: Dimensions.get("window").width,
                        //         height: 200
                        //     }}
                        //     source={{
                        //         uri: item,
                        //         style: { backgroundColor: "#e1e4e8" },
                        //         headers: { Authorization: "someAuthToken" },
                        //         priority: FastImage.priority.normal
                        //     }}
                        //     resizeMode={FastImage.resizeMode.cover}
                        // />
                    )}
                    keyExtractor={item => item}
                />
            </View>
        );
    }
}
