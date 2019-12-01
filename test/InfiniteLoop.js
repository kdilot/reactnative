import React, { Component } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';

class InfiniteLoop extends Component {
  state = {
    data: [1, 2, 3, 4, 5, 6],
    reset: new Array(10).fill(1),
    refresh: false
  }

  _getData = (data) => {
    const arr = []
    for (let i = 1; i <= 10; i++) {
      arr.push(data.length + i)
    }
    return arr
  }

  _add = () => {
    setTimeout(() => {
      this.setState({
        data: this.state.data.concat(this._getData(this.state.data)),
        refresh: false
      })
    }, 1000)
  }

  _refresh = () => {
    this.setState({
      refresh: true,
      data: this.state.reset
    })
    setTimeout(() => {
      this.setState({
        refresh: false,
      })
    }, 1000)
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={({ item }) => <Text style={style.list}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={this._add}
        onEndReachedThreshold={0.2}
        refreshing={this.state.refresh}
        onRefresh={this._refresh}
      />
    );
  }
}

const style = StyleSheet.create({
  list: {
    flex: 1,
    padding: 25,
    backgroundColor: 'yellow',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  }
})

export default InfiniteLoop;