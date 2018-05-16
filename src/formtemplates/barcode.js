import React from 'react';
import t from 'tcomb-form';

const barcode = t.form.Form.templates.textbox.clone({
  renderInput: locals => {
    return (
      <div>
        <div className="form-photo">Open Scanner</div>
      </div>
    );
  },
});

export default barcode;
