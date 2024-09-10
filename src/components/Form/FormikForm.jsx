import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    label: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters long'),
    sublabel: Yup.string(),
});

const FormikForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ label: '', sublabel: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="label">label</label>
            <Field type="text" name="label" />
            <ErrorMessage name="label" component="div" style={{ color: 'red' }} />
          </div>

          <div>
            <label htmlFor="sublabel">sublabel</label>
            <Field type="text" name="sublabel" />
            <ErrorMessage name="sublabel" component="div" style={{ color: 'red' }} />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
