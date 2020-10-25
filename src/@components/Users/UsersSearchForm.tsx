import React from 'react'
import { Formik, Form, Field } from 'formik'
import { FilterType } from '@store/reducers/usersReducer'

const UsersSearchFormValidate = (values: FormValuesTypes) => {
  const errors = {}
  return errors
}

interface SearchFormProps {
  onFilterChange: (filter: FilterType) => void
}

interface FormValuesTypes {
  term: string
  friend: 'true' | 'false' | 'null'
}

export const UsersSearchForm: React.FC<SearchFormProps> = ({
  onFilterChange,
}): React.ReactElement => {
  const submit = (
    values: FormValuesTypes,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    const filter = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false,
    }
    console.log(filter)
    onFilterChange(filter)
    setSubmitting(false)
  }

  return (
    <div>
      <Formik
        initialValues={{ term: '', friend: 'null' } as FormValuesTypes}
        validate={UsersSearchFormValidate}
        onSubmit={submit}>
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
