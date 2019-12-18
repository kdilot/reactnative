import React, { Component } from "react";
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    Animated,
    PanResponder
} from "react-native";
import News from "../assets/json/News.json";

const SCREEN_WIDTH = Dimensions.get("window").width;
class SwipeableCard extends Component {
    constructor() {
        super();
        this.panResponder;
        this.state = {
            Xposition: new Animated.Value(0),
            RightText: false,
            LeftText: false,
            test: true,
            test2: "hrthrthrth"
        };
        this.Card_Opacity = new Animated.Value(1);
        //  this is for test
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                this.state.Xposition.setValue(gestureState.dx);
                if (gestureState.dx > SCREEN_WIDTH - 200) {
                    this.setState({
                        RightText: true,
                        LeftText: false
                    });
                } else if (gestureState.dx < -SCREEN_WIDTH + 200) {
                    this.setState({
                        LeftText: true,
                        RightText: false
                    });
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (
                    gestureState.dx < SCREEN_WIDTH - 250 &&
                    gestureState.dx > -SCREEN_WIDTH + 250
                ) {
                    this.setState({
                        LeftText: false,
                        RightText: false
                    });
                    Animated.spring(
                        this.state.Xposition,
                        {
                            toValue: 0,
                            speed: 5,
                            bounciness: 10
                        },
                        { useNativeDriver: true }
                    ).start();
                } else if (gestureState.dx > SCREEN_WIDTH - 250) {
                    Animated.parallel(
                        [
                            Animated.timing(this.state.Xposition, {
                                toValue: SCREEN_WIDTH,
                                duration: 200
                            }),
                            Animated.timing(this.Card_Opacity, {
                                toValue: 0,
                                duration: 200
                            })
                        ],
                        { useNativeDriver: true }
                    ).start(() => {
                        this.setState(
                            { LeftText: false, RightText: false },
                            () => {
                                this.props.removeCard();
                            }
                        );
                    });
                } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
                    Animated.parallel(
                        [
                            Animated.timing(this.state.Xposition, {
                                toValue: -SCREEN_WIDTH,
                                duration: 200
                            }),
                            Animated.timing(this.Card_Opacity, {
                                toValue: 0,
                                duration: 200
                            })
                        ],
                        { useNativeDriver: true }
                    ).start(() => {
                        this.setState(
                            { LeftText: false, RightText: false },
                            () => {
                                this.props.removeCard();
                            }
                        );
                    });
                }
            }
        });
    }

    render() {
        const rotateCard = this.state.Xposition.interpolate({
            inputRange: [-150, 0, 150],
            outputRange: ["-15deg", "0deg", "15deg"]
        });
        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                style={[
                    styles.card_Style,
                    {
                        opacity: this.Card_Opacity,
                        transform: [
                            { translateX: this.state.Xposition },
                            { rotate: rotateCard }
                        ]
                    }
                ]}
            >
                <Image
                    source={{ uri: this.props.item.url }}
                    style={{ width: "100%", height: "100%", borderRadius: 7 }}
                />
                <Text style={styles.Card_Title}>
                    {" "}
                    {this.props.item.card_Title}{" "}
                </Text>
                {this.state.LeftText ? (
                    <Text style={styles.Left_Text_Style}> Left Swipe </Text>
                ) : null}
                {this.state.RightText ? (
                    <Text style={styles.Right_Text_Style}> Right Swipe </Text>
                ) : null}
            </Animated.View>
        );
    }
}

export default class CardUI extends Component {
    constructor() {
        super();
        this.state = {
            Sample_Card_Array: News,
            No_More_Card: false
        };
    }
    componentDidMount() {
        this.setState({
            Sample_Card_Array: this.state.Sample_Card_Array.reverse()
        });
        if (this.state.Sample_Card_Array.length == 0) {
            this.setState({ No_More_Card: true });
        }
    }
    removeCard = id => {
        this.state.Sample_Card_Array.splice(
            this.state.Sample_Card_Array.findIndex(x => x.id == id),
            1
        );
        this.setState(
            { Sample_Card_Array: this.state.Sample_Card_Array },
            () => {
                if (this.state.Sample_Card_Array.length == 0) {
                    this.setState({ No_More_Card: true });
                }
            }
        );
    };
    render() {
        return (
            <View style={styles.MainContainer}>
                {this.state.Sample_Card_Array.map((item, key) => (
                    <SwipeableCard
                        key={key}
                        item={item}
                        removeCard={this.removeCard.bind(this, item.id)}
                    />
                ))}
                {this.state.No_More_Card ? (
                    <Text style={{ fontSize: 22, color: "#000" }}>
                        No Cards Found.
                    </Text>
                ) : null}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    MainContainer: {
        position: "relative",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    card_Style: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        borderRadius: 7
    },
    Card_Title: {
        padding: 10,
        bottom: 0,
        position: "absolute",
        color: "#fff",
        backgroundColor: "black",
        fontSize: 20,
        borderRadius: 7
    },
    Left_Text_Style: {
        top: 22,
        right: 32,
        position: "absolute",
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        backgroundColor: "transparent"
    },
    Right_Text_Style: {
        top: 22,
        left: 32,
        position: "absolute",
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        backgroundColor: "transparent"
    }
});
