import React, { Component } from "react";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Shine
} from "rn-placeholder";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    FlatList
} from "react-native";
import { NavigationEvents } from "react-navigation";
import jsonFiles from "./news.json";

const width = Dimensions.get("window").width;
const testfile = new Array(5).fill(0);

class LoadingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingFlag: true,
            refreshFlag: false
        };
    }

    _callApi = () => {
        setTimeout(() => {
            this.setState({
                loadingFlag: false,
                refreshFlag: false
            });
        }, 2000);
    };

    _refresh = () => {
        this.setState({
            refreshFlag: true,
            loadingFlag: true
        });
        this._callApi();
    };

    render() {
        const { loadingFlag, refreshFlag } = this.state;
        return (
            <>
                <NavigationEvents onDidFocus={() => this._callApi()} />
                <FlatList
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 20, backgroundColor: "#f6f6f6" }} />
                    )}
                    style={styles.container}
                    data={loadingFlag ? testfile : jsonFiles}
                    renderItem={({ item }) => (
                        <View style={styles.newsBox}>
                            {item.title ? (
                                <>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{
                                            width: "100%",
                                            height: 200,
                                            borderRadius: 7
                                        }}
                                    />
                                    <Text style={styles.headLine}>
                                        {item.title}
                                    </Text>
                                    <Text style={styles.bottomLine}>
                                        {item.from}
                                    </Text>
                                </>
                            ) : (
                                <>
                                    <Placeholder Animation={Shine}>
                                        <PlaceholderLine
                                            style={{
                                                height: 200,
                                                borderRadius: 7
                                            }}
                                        />
                                    </Placeholder>
                                    <Placeholder Animation={Shine}>
                                        <PlaceholderLine
                                            style={{ height: 30 }}
                                        />
                                        <PlaceholderLine
                                            style={{ height: 20 }}
                                        />
                                    </Placeholder>
                                </>
                            )}
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={refreshFlag}
                    onRefresh={() => {
                        this._refresh();
                    }}
                />
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width
    },
    newsBox: {
        padding: 30,
        height: 270,
        marginBottom: 30
    },
    headLine: {
        fontSize: 20,
        fontWeight: "bold",
        height: 50
    },
    bottomLine: {
        fontSize: 13,
        height: 20
    }
});

export default LoadingPage;
