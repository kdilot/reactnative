// Setting screen
import React, { Component } from "react";
//import react in our code.
import { Text, View } from "react-native";
//import all the components we are going to use.
import InfiniteLoop from "../../test/InfiniteLoop";
import SkeletonLoader from "../skeletonloader/SkeletonLoader";

export default class SecondPage extends React.Component {
    render() {
        return <SkeletonLoader />;
    }
}
