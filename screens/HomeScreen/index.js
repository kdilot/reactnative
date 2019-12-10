import React, { Component } from "react";
import {
    View,
    Text,
    ScrollView,
    Button,
    StyleSheet,
    Dimensions
} from "react-native";

const ButtonLayout = props => {
    return (
        <View style={styles.btn}>
            <Button
                title={`${props.root}`}
                onPress={() => props.navigation.navigate(props.root)}
            />
        </View>
    );
};

export default class HomeScreen extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <ButtonLayout {...this.props} root={"Login"} />
                    <ButtonLayout {...this.props} root={"Infinite"} />
                    <ButtonLayout {...this.props} root={"Skeleton"} />
                    <ButtonLayout {...this.props} root={"Scroll"} />
                    <ButtonLayout {...this.props} root={"ImageLazy"} />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "stretch"
    },
    btn: {
        width: "50%",
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20
    }
});
