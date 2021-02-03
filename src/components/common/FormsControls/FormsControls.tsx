import React from 'react'
import classnames from 'classnames'

import './FormsControls.scss'

import { WrappedFieldProps } from 'redux-form'

type TTextareaProps = {
  className?: string
  textareaValue?: string
  rows: number | undefined
  placeholder: string
  props: React.HTMLProps<HTMLTextAreaElement>
}

type TInputProps = {
  className?: string
  extracn?: string
  inputValue?: string
  placeholder?: string | undefined
  extraText?: string
  error?: string
  props: React.HTMLProps<HTMLInputElement>
}

export const Textarea: React.FC<WrappedFieldProps & TTextareaProps> = ({ input, meta: { touched, error }, className, textareaValue, rows, placeholder, ...props }) => {

  const hasError = touched && error

  return (
    <div className={hasError ? 'error' : undefined}>
      {hasError && <span>{error}</span>}
      <textarea {...input} placeholder={placeholder} value={textareaValue} className={className} rows={rows} {...props} />
    </div>
  )
}


export const Input: React.FC<WrappedFieldProps & TInputProps> = ({ input, meta: { touched, error }, inputValue, className, extracn, placeholder, extraText, ...props }) => {

  const hasError = touched && error

  return (
    <div className={classnames('inputForm', extracn, { error: hasError })}>
      {hasError && <span>{error}</span>}
      <input {...input} placeholder={placeholder} value={inputValue} className={className} {...props} />
      {extraText}
    </div>
  )
}
