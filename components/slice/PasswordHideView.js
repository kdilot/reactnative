import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PasswordHideView = props => {
    const { flag, onPress } = props;
    return (
        <Ionicons
            name={`md-${flag ? `lock` : `unlock`}`}
            size={24}
            onPress={() => {
                onPress();
            }}
        />
    );
};

export default PasswordHideView;
