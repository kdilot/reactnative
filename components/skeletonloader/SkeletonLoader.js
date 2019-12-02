import React from 'react'
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade, Shine, Loader, Progressive, ShineOverlay } from 'rn-placeholder'
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native'
const width = Dimensions.get('window').width
// import Layout from "constants/Layout"

const ShapeRect = ({ ani = Fade }) => {
  return (
    <View style={Styles.box}>
      <Placeholder Animation={ani} Left={PlaceholderMedia}>
        <PlaceholderLine />
        <PlaceholderLine />
        <PlaceholderLine />
      </Placeholder>
    </View>
  )
}

const SkeletonLoader = () => {
  return (
    <ScrollView>
      <View style={Styles.container}>
        <ShapeRect ani={Fade} />
        <ShapeRect ani={Shine} />
        <ShapeRect ani={Loader} />
        <ShapeRect ani={Progressive} />
        <ShapeRect ani={ShineOverlay} />
      </View>
    </ScrollView>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    padding: 30
  },
  box: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  }
})

export default SkeletonLoader
