import React from 'react';
import t from 'tcomb-form';
import classnames from 'classnames';

const template = t.form.Form.templates.textbox.clone({
  renderLabel: (locals) => {
    let type = locals.typeInfo.type.displayName.indexOf('Number') >= 0 ? 'number' : 'text';
    let label = locals.label;
    let htmlFor = locals.attrs.id;
    let breakpoints = locals.config.horizontal;
    const className = breakpoints ? breakpoints.getLabelClassName() : {};
    className['control-label'] = true;
    let typeEl = <span style={style.type}>{type}</span>;
    return (
      <label style={style.label} htmlFor={htmlFor} id={htmlFor} className={classnames(className)}>
        {label}
        {typeEl}
      </label>
    );
  }
});

var style = {
  label: {
    width: '100%',
  },
  type: {
    float: 'right',
    color: '#999999',
    fontWeight: 'normal',
  },
};

export default template;