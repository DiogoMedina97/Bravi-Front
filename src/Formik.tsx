import {
  FormikProps,
  Field,
  FieldProps,
  FormikValues,
} from 'formik';

import Col, { ColProps } from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

type FormikInputProps<T extends FormikValues> = FormikProps<T> & ColProps & {
  readonly name: string;
  readonly label: string;
  readonly type?: string;
}

export const FormikInput = <T extends FormikValues>({
  name, label, type="text",
  xs, sm, md, lg, xl, xxl,
  ...props
}: FormikInputProps<T>) => {
  const { handleBlur, handleChange } = props;
  const colProps = { xs, sm, md, lg, xl, xxl };

  return (
    <Field name={name}>
      {({ meta }: FieldProps) => {
        const { error, touched } = meta;
        const isValid = touched && !error;
        const isInvalid = touched && !!error;

        let { value } = meta;
        if (value === null || value === undefined) value = '';

        return (
          <Col {...colProps} className="mb-3">
            <Form.Group controlId={`input_${name}`}>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                type={type}
                placeholder={label}
                id={`input_${name}`}
                name={name}
                value={value}
                onBlur={handleBlur}
                onChange={handleChange}
                isValid={isValid}
                isInvalid={isInvalid}
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        );
      }}
    </Field>
  )
};

type FormikSelectProps<T extends FormikValues> = FormikProps<T> & ColProps & {
  readonly name: string;
  readonly label: string;
  readonly options: {
    readonly label: string;
    readonly value: any;
  }[];
}

export const FormikSelect = <T extends FormikValues>({
  name, label, options,
  xs, sm, md, lg, xl, xxl,
  ...props
}: FormikSelectProps<T>) => {
  const { handleBlur, handleChange } = props;
  const colProps = { xs, sm, md, lg, xl, xxl };

  return (
    <Field name={name}>
      {({ meta }: FieldProps) => {
        const { error, touched } = meta;
        const isValid = touched && !error;
        const isInvalid = touched && !!error;

        let { value } = meta;
        if (value === null || value === undefined) value = '';

        return (
          <Col {...colProps} className="mb-3">
            <Form.Group controlId={`input_${name}`}>
              <Form.Label>{label}</Form.Label>
              <Form.Select
                id={`input_${name}`}
                name={name}
                value={value}
                onBlur={handleBlur}
                onChange={handleChange}
                isValid={isValid}
                isInvalid={isInvalid}
              >
                <option hidden>{label}</option>
                {options.map(({ label, value }) => (
                  <option value={value}>{label}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        );
      }}
    </Field>
  )
};
