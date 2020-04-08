import React from 'react';
import classnames from 'classnames';

import './FormsControls.scss';


export const Textarea = ({ input, meta, className, textareaValue, rows, placeholder, ...props }) => {


  const hasError = meta.touched && meta.error;

  return (
    <div className={hasError ? 'error' : undefined}>
      {hasError && <span>{meta.error}</span>}
      <textarea {...input} placeholder={placeholder} value={textareaValue} className={className} rows={rows} {...props} />
    </div>
  );
};


export const Input = ({ input, meta, inputValue, className, extracn, rows, placeholder, extraText, error, ...props }) => {

  const hasError = meta.touched && meta.error;

  return (
    <div className={classnames('inputForm', extracn, { error: hasError })}>
      {hasError && <span>{meta.error}</span>}
      <input {...input} placeholder={placeholder} value={inputValue} className={className} rows={rows} {...props} />
      {extraText}
    </div>
  );
};
