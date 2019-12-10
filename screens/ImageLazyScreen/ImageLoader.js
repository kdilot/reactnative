import React from "react";
import { Dimensions } from "react-native";
import FastImage from "react-native-fast-image";

const ImageLoader = ({ uri, height = 200, backgroundColor = "#e1e4e8" }) => {
    return (
        <FastImage
            style={{
                backgroundColor: backgroundColor,
                width: Dimensions.get("window").width,
                height: height
            }}
            source={{
                uri: uri,
                // style: { backgroundColor: backgroundColor },
                headers: { Authorization: "someAuthToken" },
                priority: FastImage.priority.normal,
                // cache: FastImage.cacheControl.cacheOnly,
            }}
            resizeMode={FastImage.resizeMode.cover}
        />
    );
};

export default ImageLoader;
