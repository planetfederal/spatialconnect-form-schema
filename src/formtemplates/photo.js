import React from 'react';
import t from 'tcomb-form';

const photo = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return (
      <div>
        <div className="form-photo">
          Photo Upload
        </div>
      </div>
    );
  }
})

export default photo;