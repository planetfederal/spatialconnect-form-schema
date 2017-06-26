import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Alert,
  findNodeHandle,
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Button from 'react-native-button';
import translate from './translate';
import transform from 'tcomb-json-schema';
import tcomb from 'tcomb-form-native';
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
    const formData = this.form.getValue();
    if (formData) {
      this.props.saveForm(formData);
    }
    // validation here?
  }
  formSubmitted() {
    Alert.alert('Form Submitted', '', [
      { text: 'OK' },
      { text: 'New Submission', onPress: () => this.setState({ value: this.initialValues }) },
    ]);
  }
  render() {
    return (
      <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
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
            <Button
              style={buttonStyles.buttonText}
              containerStyle={buttonStyles.button}
              styleDisabled={buttonStyles.disabled}
              disabled={this.props.submitting}
              onPress={this.onSubmit}
            >
              {this.props.submitting ? 'Submitting' : 'Submit'}
            </Button>
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
    marginTop: 0,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#EEEEEE',
  },
  success: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e4e7ec',
  },
  scrollView: {
    flex: 1,
  },
  formName: {
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#bbb',
    borderBottomWidth: 1,
  },
  formNameText: {
    color: '#333',
    fontSize: 24,
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderColor: '#e4e7ec',
    borderBottomWidth: 1,
  },
});

const buttonStyles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 46,
    backgroundColor: palette.orange,
    borderColor: palette.orange,
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  link: {
    color: 'blue',
  },
});

export default SCForm;
