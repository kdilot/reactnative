import React, { Component } from 'react';
import { Text, TouchableOpacity, View, AppState } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './FingerPrint.styles';
import FingerPrintPopup from './FingerPrintPopup';

class FingerPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: undefined,
      biometric: undefined,
      popupShowed: false,
    };
  }

  handleFingerprintShowed = () => {
    this.setState({ popupShowed: true });
  };

  handleFingerprintDismissed = () => {
    this.setState({ popupShowed: false });
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    // Get initial fingerprint enrolled
    this.detectFingerprintAvailable();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  detectFingerprintAvailable = () => {
    FingerprintScanner.isSensorAvailable().catch(error =>
      this.setState({
        errorMessage: error.message,
        biometric: error.biometric,
      }),
    );
  };

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState &&
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      FingerprintScanner.release();
      this.detectFingerprintAvailable();
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    const { errorMessage, biometric } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>React Native Fingerprint Scanner</Text>

        <TouchableOpacity
          style={styles.fingerprint}
          onPress={this.handleFingerprintShowed}
          disabled={!!errorMessage}>
          {/* <Image source={require('./assets/finger_print.png')} /> */}
          <Icon name="md-finger-print" size={40} color={'#D94400'} />
        </TouchableOpacity>

        {errorMessage && (
          <Text style={styles.errorMessage}>
            {errorMessage} {biometric}
          </Text>
        )}

        {biometric && (
          <FingerPrintPopup
            style={styles.popup}
            handlePopupDismissed={this.handleFingerprintDismissed}
          />
        )}
      </View>
    );
  }
}

export default FingerPrint;
