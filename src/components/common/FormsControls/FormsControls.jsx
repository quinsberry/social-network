import React from 'react';
import classnames from 'classnames';

import './FormsControls.scss';


export const Textarea = ({ input, meta, className, rows, placeholder, ...props }) => {


  const hasError = meta.touched && meta.error;

  return (
    <div className={hasError ? 'error' : undefined}>
      {hasError && <span>{meta.error}</span>}
      <textarea {...input} placeholder={placeholder} className={className} rows={rows} {...props} />
    </div>
  );
};


export const Input = ({ input, meta, className, rows, placeholder, extraText, error, ...props }) => {

  const hasError = meta.touched && meta.error;

  return (
    <div className={classnames('inputForm', { error: hasError })}>
      {hasError && <span>{meta.error}</span>}
      <input {...input} placeholder={placeholder} className={className} rows={rows} {...props} />
      {extraText}
    </div>
  );
};
