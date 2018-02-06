import React from 'react';
import t from 'tcomb-form';

const photos = t.form.Form.templates.textbox.clone({
  renderInput: locals => {
    return (
      <div>
        <div className="form-photo">Photo/Video Upload</div>
      </div>
    );
  },
});

export default photos;
