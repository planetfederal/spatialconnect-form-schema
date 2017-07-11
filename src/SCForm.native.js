import React, { Component, PropTypes } from 'react';
import {
  ActivityIndicator,
  Animated,
  Alert,
  findNodeHandle,
  Keyboard,
  Modal,
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
  }

  onFocus(e) {
    let scrollResponder = this.scrollView.getScrollResponder();
    scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      findNodeHandle(e.target),
      150,
      true
    );
  }

  keyboardWillShow(event) {
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: event.endCoordinates.height,
    }).start();
  }

  keyboardWillHide(event) {
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: 0,
    }).start();
  }

  onChange(value) {
    this.setState({ value });
  }

  onSubmit() {
    if (validateFields(this.form)) {
      const formData = this.form.getValue();
      if (formData) {
        Alert.alert('Submit Form', 'Would you like to submit this form?', [
          { text: 'Cancel' },
          { text: 'Submit', onPress: () => this.props.saveForm(formData) },
        ]);
      }
    }
  }
  formSubmitted() {
    // https://github.com/facebook/react-native/issues/10471
    requestAnimationFrame(() => {
      Alert.alert('Form Submitted', '', [
        { text: 'Reset Form', onPress: () => this.setState({ value: this.initialValues }) },
        { text: 'OK' },
      ]);
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
        <Modal visible={this.props.submitting} transparent onRequestClose={() => {}}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <ActivityIndicator />
            </View>
          </View>
        </Modal>
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
              options={this.options}
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
