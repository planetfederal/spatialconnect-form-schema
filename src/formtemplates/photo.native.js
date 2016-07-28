import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableHighlight,
  StyleSheet,
  View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import palette from './palette';

class SCFormPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoSource: null,
      loading: false
    };
  }

  takePicture() {
    var options = {
      title: this.props.title,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    if (this.state.photoSource) {
      options.customButtons = {
        'Remove Photo': 'remove'
      };
    }
    this.setState({ loading: true });
    ImagePicker.showImagePicker(options, (response) => {
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
          photoSource: source
        });
      }
    });
  }

  retakePicture() {
    this.setState({ photoSource: null });
    this.takePicture();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.photoSource ?
          <View>
          <TouchableHighlight onPress={this.takePicture.bind(this)}>
            <Image style={styles.image} source={this.state.photoSource}/>
            </TouchableHighlight>
          </View> :
          <View>
            { this.state.loading ? <Text>Loading Photo...</Text> :
              <View>
              <TouchableHighlight style={styles.button} onPress={this.takePicture.bind(this)} underlayColor={palette.lightblue}>
                <Text style={styles.buttonText}>Take Photo</Text>
              </TouchableHighlight>
              {this.props.error ? <Text style={styles.error}>{this.props.error}</Text> : null}
              </View>
            }
          </View>}
      </View>
    );
  }
}

export default function(locals) {
  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;

  function setValue(uri) {
    locals.onChange(uri);
  }

  return (
    <View style={formGroupStyle}>
      <Text style={controlLabelStyle}>{locals.label}</Text>
      <SCFormPhoto title={locals.label} setValue={setValue} error={locals.error}/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  image: {
    height: 100,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 0.5,
    backgroundColor: palette.darkblue,
    borderColor: palette.darkblue,
    borderWidth: 1,
    borderRadius: 5,
    margin: 0,
    padding: 5,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  error: {
    flex: 1,
    color: '#B25856'
  }
});