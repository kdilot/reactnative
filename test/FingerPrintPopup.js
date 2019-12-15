import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Alert,
  //   Image,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import ShakingText from './ShakingText';
import styles from './FingerPrintPopup.styles';
import Icon from 'react-native-vector-icons/Ionicons';

class FingerPrintPopup extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: undefined };
  }

  componentDidMount() {
    FingerprintScanner.authenticate({
      onAttempt: this.handleAuthenticationAttempted,
    })
      .then(() => {
        this.props.handlePopupDismissed();
        Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
      })
      .catch(error => {
        // Error Type
        // AuthenticationNotMatch	No match
        // AuthenticationFailed	Authentication was not successful because the user failed to provide valid credentials
        // UserCancel	Authentication was canceled by the user - e.g. the user tapped Cancel in the dialog
        // UserFallback	Authentication was canceled because the user tapped the fallback button (Enter Password)
        // SystemCancel	Authentication was canceled by system - e.g. if another application came to foreground while the authentication dialog was up
        // PasscodeNotSet	Authentication could not start because the passcode is not set on the device
        // FingerprintScannerNotAvailable	Authentication could not start because Fingerprint Scanner is not available on the device
        // FingerprintScannerNotEnrolled	Authentication could not start because Fingerprint Scanner has no enrolled fingers
        // FingerprintScannerUnknownError	Could not authenticate for an unknown reason
        // FingerprintScannerNotSupported	Device does not support Fingerprint Scanner
        // DeviceLocked	Authentication was not successful, the device currently in a lockout of 30 seconds
        this.setState({ errorMessage: error.message });
        this.description.shake();
      });
  }

  componentWillUnmount() {
    FingerprintScanner.release();
  }

  handleAuthenticationAttempted = error => {
    this.setState({ errorMessage: error.message });
    this.description.shake();
  };

  render() {
    const { errorMessage } = this.state;
    const { style, handlePopupDismissed } = this.props;

    return (
      <View style={styles.container}>
        <View style={[styles.contentContainer, style]}>
          {/* <Image
            style={styles.logo}
            source={require('./assets/finger_print.png')}
          /> */}
          <View style={styles.logo}>
            <Icon name="md-finger-print" size={30} />
          </View>
          <View style={styles.message}>
            <ShakingText
              ref={instance => {
                this.description = instance;
              }}
              style={styles.description(errorMessage)}>
              {errorMessage ||
                'Scan your fingerprint on the\ndevice scanner to continue'}
            </ShakingText>
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handlePopupDismissed}>
            <Text style={styles.buttonText}>BACK TO MAIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

FingerPrintPopup.propTypes = {
  style: ViewPropTypes.style,
  handlePopupDismissed: PropTypes.func.isRequired,
};

export default FingerPrintPopup;
