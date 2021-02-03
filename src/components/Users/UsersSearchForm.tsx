import React from 'react'
import { Formik, Form, Field } from 'formik'
import { FilterType } from '@store/reducers/usersReducer'

const UsersSearchFormValidate = (values: FormValuesTypes) => {
  const errors = {}
  return errors
}

interface SearchFormProps {
  filter: {
    term: string
    friend: boolean | null
  }
  onFilterChange: (filter: FilterType) => void
}

interface FormValuesTypes {
  term: string
  friend: 'true' | 'false' | 'null'
}

export const UsersSearchForm: React.FC<SearchFormProps> = React.memo(
  ({ filter, onFilterChange }): React.ReactElement => {
    const submit = (values: FormValuesTypes, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }): void => {
      const filter = {
        term: values.term,
        friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false,
      }
      onFilterChange(filter)
      setSubmitting(false)
    }

    return (
      <div>
        <Formik
          enableReinitialize
          initialValues={{ term: filter.term, friend: String(filter.friend) } as FormValuesTypes}
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
  },
)
