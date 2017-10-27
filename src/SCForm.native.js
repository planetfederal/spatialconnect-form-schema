import React, { Component, PropTypes } from 'react';
import {
  ActivityIndicator,
  Animated,
  Alert,
  Dimensions,
  findNodeHandle,
  Keyboard,
  Modal,
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import translate from './translate';
import validateFields from './validateFields';
import transform from 'tcomb-json-schema';
import tcomb from 'tcomb-form-native';
import scstyles from './scstyles';

transform.registerType('date', tcomb.Date);

const Form = tcomb.form.Form;

class SCForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
      renderPlaceholderOnly: true,
      windowHeight: Dimensions.get('window').height,
    };
    this.keyboardHeight = new Animated.Value(0);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  componentWillMount() {
    const formInfo = this.props.form;
    const { schema, options, initialValues } = translate({
      scSchema: formInfo,
      onFocus: this.onFocus,
    });
    this.setState({ schema, options, value: initialValues });
    this.initialValues = initialValues;
    this.options = options;
    this.TcombType = transform(schema);
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    Dimensions.addEventListener('change', dimensions => {
      this.setState({ windowHeight: dimensions.window.height });
    });
  }

  onFocus(e) {
    e.persist();
    // measure and save where focused input is
    NativeModules.UIManager.measure(
      findNodeHandle(e.target),
      (x, y, width, height, pageX, pageY) => {
        this.setState({ focusedInput: e.target, focusedInputPageY: pageY });
      }
    );
  }

  keyboardWillShow(event) {
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: event.endCoordinates.height,
    }).start(() => {
      // only scroll to input if the field is hidden behind keyboard
      const hidden =
        this.state.focusedInputPageY > this.state.windowHeight - event.endCoordinates.height;
      if (hidden) {
        let scrollResponder = this.scrollView.getScrollResponder();
        scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
          findNodeHandle(this.state.focusedInput),
          150,
          true
        );
      }
    });
  }

  keyboardWillHide(event) {
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: 0,
    }).start();
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
      Alert.alert('Submit Form', 'Would you like to submit this form?', [
        { text: 'Cancel' },
        { text: 'Submit', onPress: () => this.props.saveForm(formData) },
      ]);
    } else {
      Alert.alert('Invalid Form', 'Please fix all form errors and resubmit.', [{ text: 'OK' }]);
    }
  }
  formSubmitted() {
    // https://github.com/facebook/react-native/issues/10471
    requestAnimationFrame(() => {
      Alert.alert('Success', 'Your submission was accepted.', [
        { text: 'Reset Form', onPress: () => this.setState({ value: this.initialValues }) },
        { text: 'OK', onPress: () => this.props.navigation.goBack() },
      ]);
    });
  }

  formSubmittedOffline() {
    // https://github.com/facebook/react-native/issues/10471
    requestAnimationFrame(() => {
      Alert.alert(
        'Saved',
        "Your submission was unable to be uploaded. It's been saved, and you can attempt to reupload at a later time.",
        [
          { text: 'Reset Form', onPress: () => this.setState({ value: this.initialValues }) },
          { text: 'OK', onPress: () => this.props.navigation.goBack() },
        ]
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

  render() {
    return (
      <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
        {this.props.submitting && (
          <Modal visible={this.props.submitting} transparent onRequestClose={() => {}}>
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <ActivityIndicator size="large" animating={this.props.submitting} />
              </View>
            </View>
          </Modal>
        )}
        <ScrollView
          style={styles.scrollView}
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={true}
          ref={ref => {
            this.scrollView = ref;
          }}
        >
          <View style={styles.form}>
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
        </ScrollView>
      </Animated.View>
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
    backgroundColor: '#FAFAFA',
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
});

export default SCForm;
