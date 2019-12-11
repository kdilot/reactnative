import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PinView from "react-native-pin-view";
import { Ionicons } from "@expo/vector-icons";

const PinLayout = ({ text = "PIN CODE", color = "#E64800", pinLength = 6 }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textLayout}>
                <Text style={styles.text}>{text}</Text>
            </View>
            <View style={styles.pinLayout}>
                <PinView
                    onComplete={(val, clear) => {
                        alert(val);
                        clear();
                    }}
                    pinLength={pinLength}
                    inputBgColor={color}
                    inputActiveBgColor={color}
                    keyboardContainerStyle={{ marginTop: 0 }}
                    buttonTextColor={color}
                    keyboardViewStyle={{
                        borderWidth: 1,
                        borderColor: color
                    }}
                    buttonDeletePosition={"right"}
                    deleteText={<Ionicons name="md-arrow-back" size={30} />}
                />
            </View>
        </View>
    );
};

export default PinLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textLayout: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        fontWeight: "bold"
    },
    pinLayout: { flex: 3, alignItems: "center", justifyContent: "center" }
});
