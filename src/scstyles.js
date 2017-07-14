import t from 'tcomb-form';
import { cloneDeep } from 'lodash';
import palette from './palette';

let formStyle = cloneDeep(t.form.Form.stylesheet);

export default {
  palette: palette,
  formStyle: formStyle,
};
