import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { RNCamera } from 'react-native-camera';
import scstyles from 'scstyles';

class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barcodeValue: false,
      loading: false,
      open: false,
    };
    this.openScanner = this.openScanner.bind(this);
    this.closeScanner = this.closeScanner.bind(this);
    this.onBarCodeRead = this.onBarCodeRead.bind(this);
  }

  openScanner() {
    this.setState({ open: true });
  }

  closeScanner() {
    this.setState({ open: false });
  }

  onBarCodeRead(barcode) {
    this.props.setValue(barcode.data);
    this.setState({ open: false, barcodeValue: barcode.data });
  }

  componentWillMount() {
    if (this.props.value) {
      this.setState({ barcodeValue: this.props.value });
    }
  }

  renderValue() {
    if (this.state.barcodeValue) {
      return (
        <TouchableOpacity onPress={this.openScanner}>
          <Text style={styles.valueText}>{this.state.barcodeValue}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <View>
          <TouchableOpacity style={scstyles.buttonStyles.button} onPress={this.openScanner}>
            <Text style={scstyles.buttonStyles.buttonText}>Open Scanner</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderNoValue() {
    if (this.state.open) {
      return (
        <Modal onRequestClose={() => {}}>
          <View style={styles.cameraContainer}>
            <RNCamera
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              permissionDialogTitle={'Permission to use camera'}
              permissionDialogMessage={'We need your permission to use your camera phone'}
              onBarCodeRead={this.onBarCodeRead}
            />
            <View style={styles.scanBoxContainer}>
              <View style={styles.scanBox} />
            </View>
            <View style={styles.close}>
              <TouchableOpacity style={scstyles.buttonStyles.button} onPress={this.closeScanner}>
                <Text style={scstyles.buttonStyles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderValue()}
        {this.renderNoValue()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  preview: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  close: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 150,
    padding: 20,
  },
  valueText: {
    color: '#000',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    paddingVertical: 8,
  },
  scanBoxContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanBox: {
    height: 150,
    width: '80%',
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: scstyles.palette.green,
  },
});

export default function(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    controlLabelStyle = stylesheet.controlLabel.error;
  }

  function setValue(uri) {
    locals.onChange(uri);
  }

  var label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
  var error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;

  return (
    <View style={formGroupStyle}>
      {label}
      <BarcodeScanner
        value={locals.value}
        title={locals.label}
        setValue={setValue}
        error={locals.error}
      />
      {error}
    </View>
  );
}
