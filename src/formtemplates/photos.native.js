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
import ImagePicker from 'react-native-image-crop-picker';
import scstyles from 'scstyles';

class SCFormPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      loading: false,
    };
  }

  choosePhotosVideos() {
    this.setState({ loading: true });
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      // images is an array of objects: https://github.com/ivpusic/react-native-image-crop-picker#response-object
      let newPhotos = this.state.photos.concat(images.map(i => i.path));
      this.setState({
        loading: false,
        photos: newPhotos,
      });
    }).catch(e => {
      this.setState({ loading: false });
    });;
  }

  takePicture() {
    this.setState({ loading: true });
    ImagePicker.openCamera({
      width: 300,
      height: 400
    }).then(image => {
      let newPhotos = this.state.photos.concat(image.path);
      this.setState({
        loading: false,
        photos: newPhotos,
      });
    }).catch(e => {
      this.setState({ loading: false });
    });
  }

  componentWillMount() {
    if (this.props.value) {
      this.setState({ photos: this.props.value });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    this.props.setValue(nextState.photos);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          {this.state.loading ? (
            <Text>Loading Photo/Video...</Text>
          ) : (
            <View>
              <TouchableOpacity
                style={scstyles.buttonStyles.button}
                onPress={this.takePicture.bind(this)}
              >
                <Text style={scstyles.buttonStyles.buttonText}>Take Photo/Video</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={scstyles.buttonStyles.button}
                onPress={this.choosePhotosVideos.bind(this)}
              >
                <Text style={scstyles.buttonStyles.buttonText}>Choose Photo/Video</Text>
              </TouchableOpacity>
            </View>
          )}
        {this.state.photos && typeof this.state.photos === "string" &&
           JSON.parse(this.state.photos).map((photo, idx) => {
              let accessToken = photo.split('access_token=')[1];
              let imgSrc = accessToken ? 
                { uri: photo, headers: { Authorization: `Bearer ${accessToken}` } } :
                { uri: photo };  
              console.log('photos was string imgSrc is ', imgSrc)
              return <TouchableOpacity key={idx} onPress={this.takePicture.bind(this)}>
                       <Image style={styles.image} source={imgSrc} />
                     </TouchableOpacity>;
           })
        }
        {this.state.photos && typeof this.state.photos === "object" &&
           this.state.photos.map((photo, idx) => {
              let accessToken = photo.split('access_token=')[1];
              let imgSrc = accessToken ? 
                { uri: photo, headers: { Authorization: `Bearer ${accessToken}` } } :
                { uri: photo };  
              console.log('photos was object/array imgSrc is ', imgSrc)
              return <TouchableOpacity key={idx} onPress={this.takePicture.bind(this)}>
                       <Image style={styles.image} source={imgSrc} />
                     </TouchableOpacity>;
           })
        }
          </View>
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

  function setValue(photos) {
    locals.onChange(photos);
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
      <SCFormPhotos
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
