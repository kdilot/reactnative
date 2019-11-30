import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

class DrawerMenu extends Component {
  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={styles.banner}>
          <Ionicons
            style={styles.bannerIcon}
            name={'md-cube'}
            color={'white'}
            size={45}
          />
          <Text style={styles.bannerText}>Drawer</Text>
        </View>
        <DrawerItems {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: Colors.mainColor,
    borderBottomColor: 'white'
  },
  bannerIcon: {
    paddingRight: 15
  },
  bannerText: {
    fontSize: 40,
    color: 'white',
  }
});

export default DrawerMenu