/**
 * Sample React Native App Enabling Biometric
 * https://github.com/ashu777
 *
 * @format
 * @flow
 * 
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const App= () => {

//Check Biometrics available or not

  const enableBiometricAuth = () => {
    const rnBiometrics =  ReactNativeBiometrics;
    rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject;
        if (available && biometryType === "TouchID") {
          Alert.alert('TouchID', 'Would you like to enable TouchID authentication for the next time?', [
            {
              text: 'Yes please',
              onPress: async () => {
                Alert.alert('Success!', 'TouchID authentication enabled successfully!');
              },
            },
            { text: 'Cancel', style: 'cancel' },
          ]);
        } else if (available && biometryType === "FaceID") {
          Alert.alert('FaceID', 'Would you like to enable FaceID authentication for the next time?', [
            {
              text: 'Yes please',
              onPress: async () => {
                Alert.alert('Success!', 'FaceID authentication enabled successfully!');
              },
            },
            { text: 'Cancel', style: 'cancel' },
          ]);
        } else if (available && biometryType === "Biometrics") {
          Alert.alert('Device Supported Biometrics', 'Biometrics authentication is supported.');
        } else {
          Alert.alert('Biometrics not supported', 'This device does not support biometric authentication.');
        }
 
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred while checking biometrics availability.');
      });
  };

  //Check Biometric Auth

  const handleBiometricAuth = async () => {
    try {
      const rnBiometrics =  ReactNativeBiometrics;
      const { success, error } = await rnBiometrics.simplePrompt({ promptMessage: 'Authenticate to continue' });
  
      if (success) {
        Alert.alert('Success', 'Biometric authentication successful');
        return true;
      } else {
        Alert.alert('Authentication failed', 'Biometric authentication failed');
        return false;
      }
    } catch (error) {
      console.error('[handleBiometricAuth] Error:', error);
      Alert.alert('Error', 'Biometric authentication failed from device');
      return false;
    }
  };


  return (
    <View style={styles.Container}>
     <TouchableOpacity style={styles.button} onPress={handleBiometricAuth}>
      <Text style={styles.text}>Enable Biometric</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.button} onPress={enableBiometricAuth}>
      <Text style={styles.text}>Biometric Availability</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom:20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#841584',
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default App;
