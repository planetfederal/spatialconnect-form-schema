import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import scstyles from 'scstyles';

class SCFormPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoSource: null,
      loading: false,
    };
  }

  takePicture() {
    var options = {
      title: this.props.title,
      quality: 0.1,
      maxWidth: 1920,
      maxHeight: 1080,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    if (this.state.photoSource) {
      options.customButtons = {
        'Remove Photo': 'remove',
      };
    }
    this.setState({ loading: true });
    ImagePicker.showImagePicker(options, response => {
      this.setState({ loading: false });
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        this.setState({ photoSource: null });
        this.props.setValue('');
      } else {
        this.props.setValue('data:image/jpeg;base64,' + response.data);
        let source = { isStatic: true };
        if (Platform.OS === 'ios') {
          source.uri = response.uri.replace('file://', '');
        } else {
          source.uri = response.uri;
        }
        this.setState({
          photoSource: source,
        });
      }
    });
  }

  retakePicture() {
    this.setState({ photoSource: null });
    this.takePicture();
  }

  componentWillMount() {
    if (this.props.value) {
      this.setState({ photoSource: { uri: this.props.value } });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.photoSource ? (
          <View>
            <TouchableOpacity onPress={this.takePicture.bind(this)}>
              <Image style={styles.image} source={this.state.photoSource} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {this.state.loading ? (
              <Text>Loading Photo...</Text>
            ) : (
              <View>
                <TouchableOpacity
                  style={scstyles.buttonStyles.button}
                  onPress={this.takePicture.bind(this)}
                >
                  <Text style={scstyles.buttonStyles.buttonText}>Take Photo</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

export default function(locals) {
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
      <SCFormPhoto
        value={locals.value}
        title={locals.label}
        setValue={setValue}
        error={locals.error}
      />
      {error}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 100,
    backgroundColor: 'white',
  },
});
