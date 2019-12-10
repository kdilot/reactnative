import React, { Component } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Ionicons } from "@expo/vector-icons";

class ProgressView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "PPP",
            animation: new Animated.Value(0)
        };
    }

    componentDidMount() {
        Animated.loop(
            Animated.timing(this.state.animation, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true
            })
        ).start();
        // Animated.timing(this.state.animation).stop(); // stop animation
    }

    render() {
        const { text, animation } = this.state;
        const { topBar } = this.props;
        const spin = animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"]
        });
        return (
            <View style={styles.container}>
                <AnimatedCircularProgress
                    size={50}
                    width={3}
                    fill={topBar ? topBar : 0}
                    // prefill={50} // 기본적으로 시작 할 게이지 위치
                    duration={1000}
                    tintColor="#E64800"
                    childrenContainerStyle={{ backgroundColor: "white" }}
                    backgroundColor="#3d5875"
                >
                    {fill => (
                        <Animated.View
                            style={{ transform: [{ rotateY: spin }] }}
                        >
                            <Ionicons
                                name="logo-bitcoin"
                                size={30}
                                color={"#D94400"}
                            />
                        </Animated.View>
                    )}
                </AnimatedCircularProgress>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 10,
        bottom: 30,
        zIndex: 10
    }
});

export default ProgressView;
