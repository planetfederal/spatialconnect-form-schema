import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import translate from './translate';
import validateFields from './validateFields';
import transform from 'tcomb-json-schema';
import tcomb from 'tcomb-form-native';
import scstyles from './scstyles.native';
import palette from './palette';

transform.registerType('date', tcomb.Date);

const Form = tcomb.form.Form;

class SCForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
      renderPlaceholderOnly: true,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const formInfo = this.props.form;
    const { schema, options, initialValues } = translate({
      scSchema: formInfo,
    });
    this.setState({ schema, options, value: initialValues });
    this.initialValues = initialValues;
    this.options = options;
    this.TcombType = transform(schema);
  }

  getValue() {
    let values = {};
    let fields = this.form.refs.input.refs;

    for (let ref in fields) {
      if (fields.hasOwnProperty(ref)) {
        values[ref] = fields[ref].getValue();
      }
    }

    return values;
  }

  onChange(value) {
    this.setState({ value });
  }

  onSubmit() {
    const formData = this.getValue();
    let result = validateFields(formData, this.state.schema, this.state.options);
    this.setState({ options: result.options });
    if (!result.hasError) {
      this.props.saveForm(formData);
    } else {
      Alert.alert('Invalid Form', 'Please fix all form errors and resubmit.', [{ text: 'OK' }]);
    }
  }
  formSubmitted() {
    // https://github.com/facebook/react-native/issues/10471
    requestAnimationFrame(() => {
      Alert.alert('Success', 'Feature saved and synced with Boundless Exchange.', [
        { text: 'Done', onPress: () => this.props.navigation.goBack() },
      ]);
    });
  }

  formSubmittedOffline() {
    // https://github.com/facebook/react-native/issues/10471
    requestAnimationFrame(() => {
      Alert.alert(
        'Saved',
        'This change has been saved to your device. Connect to a network to sync it to Boundless Exchange.',
        [{ text: 'Done', onPress: () => this.props.navigation.goBack() }]
      );
    });
  }

  formSubmittedError() {
    // https://github.com/facebook/react-native/issues/10471
    requestAnimationFrame(() => {
      Alert.alert('Error', 'There was an error submitting this form. Please try again.', [
        { text: 'OK' },
      ]);
    });
  }

  renderCoordinates() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={scstyles.formStyle.formGroup.normal}>
          <Text style={scstyles.formStyle.controlLabel.normal}>Location</Text>
          <Text style={[scstyles.formStyle.textboxView.normal, styles.locationText]}>
            {this.props.coordinates
              .map(c => c.toFixed(4))
              .reverse()
              .join(', ')}
          </Text>
        </View>
        {this.props.resetLocation && (
          <TouchableOpacity style={styles.reset} onPress={this.props.resetLocation}>
            <Text style={styles.resetText}>Reset Location</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.submitting && (
          <Modal visible={this.props.submitting} transparent onRequestClose={() => {}}>
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <ActivityIndicator size="large" animating={this.props.submitting} />
              </View>
            </View>
          </Modal>
        )}
        <KeyboardAwareScrollView
          style={styles.scrollView}
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={true}
          extraHeight={164}
        >
          <View style={styles.form}>
            {this.props.coordinates && this.renderCoordinates()}
            <Form
              ref={ref => {
                this.form = ref;
              }}
              value={this.state.value}
              type={this.TcombType}
              options={this.state.options}
              onChange={this.onChange}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

SCForm.propTypes = {
  form: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  saveForm: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Platform.OS === 'ios' ? 10 : 2,
  },
  locationText: {
    paddingTop: 8,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  reset: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  resetText: {
    color: palette.green,
    fontFamily: 'ProximaNova-Semibold',
    fontSize: 10,
  },
});

export default SCForm;
