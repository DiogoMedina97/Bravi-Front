import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { CreateDTO, UpdateDTO } from '../../dto';

import { FormikInput } from '../../../Formik';

type FormValues = CreateDTO | UpdateDTO;

interface PersonFormProps<T extends FormValues> {
  readonly initialValues: T;
  readonly onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void;
}

export const PersonForm = <T extends FormValues>({
  initialValues, onSubmit,
}: PersonFormProps<T>) => (
  <Formik<T>
    validationSchema={schema}
    initialValues={initialValues}
    onSubmit={onSubmit}
  >
    {(props) => (
      <Form noValidate onSubmit={props.handleSubmit}>
        <Form.Group as={Row}>
          <FormikInput
            {...props}
            md={6}
            label="Nome"
            name="name"
          />
          <FormikInput
            {...props}
            md={6}
            label="Sobrenome"
            name="surname"
          />
        </Form.Group>
        <Button type="submit" disabled={props.isSubmitting}>Criar</Button>
      </Form>
    )}
  </Formik>
);

const schema = yup.object({
  name: yup.string().required(),
  surname: yup.string().required(),
});
