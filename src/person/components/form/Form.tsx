import {
  Formik,
  FormikHelpers,
  FormikProps,
  FieldArray,
  FieldArrayRenderProps,
} from 'formik';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CreateDTO, UpdateDTO } from '../../dto';

import { FormikInput, FormikSelect } from '../../../Formik';
import { CreateDTO as ContactCreateDTO } from '../../../contact/dto';

type FormValues = CreateDTO | UpdateDTO;

interface PersonFormProps<T extends FormValues> {
  readonly update?: boolean;
  readonly initialValues: T;
  readonly onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void;
}

export const PersonForm = <T extends FormValues>({
  update=false, initialValues, onSubmit,
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
        <Contacts
          {...props}
        />
        <Button type="submit" disabled={props.isSubmitting}>
          {update ? 'Atualizar' : 'Criar'}
        </Button>
      </Form>
    )}
  </Formik>
);

interface ContactsProps<T extends FormValues> extends FormikProps<T> {}

const Contacts = <T extends FormValues>(props: ContactsProps<T>) => {
  const { values } = props;
  const { contacts } = values;

  return (
    <div className="my-3">
      <h5 className="mb-3 subheader">Contatos</h5>

      <FieldArray name="contacts" validateOnChange={false}>
        {(arrayHelpers: FieldArrayRenderProps) => {
          const onAddContact = () => {
            const newContact: ContactCreateDTO = {
              type: '',
              value: '',
            };
            arrayHelpers.push(newContact);
          };

          const onRemoveContact = (index: number) => () => {
            arrayHelpers.remove(index);
          };

          return (
            <>
              {Array.isArray(contacts) && contacts.length > 0 ? (
                contacts.map((_, i) => (
                  <ContactForm
                    {...props}
                    key={i}
                    index={i}
                    onRemove={onRemoveContact(i)}
                  />
                ))
              ) : null}
              <Button
                type="button"
                variant="success"
                onClick={onAddContact}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </>
          );
        }}
      </FieldArray>
    </div>
  );
};

interface ContactFormProps<T extends FormValues> extends FormikProps<T> {
  readonly index: number;
  readonly onRemove: () => void;
}

const ContactForm = <T extends FormValues>({
  index, onRemove, ...props
}: ContactFormProps<T>) => {
  return (
    <Form.Group as={Row}>
      <Col md={1}>
        <Button
          type="button"
          variant="danger"
          onClick={onRemove}
        >
          <FontAwesomeIcon icon={faMinus} />
        </Button>
      </Col>
      <Col md={11}>
        <Form.Group as={Row}>
          <FormikSelect
            {...props}
            md={6}
            label="Tipo"
            name={`contacts[${index}].type`}
            options={[
              { label: 'Telefone', value: 'phone' },
              { label: 'E-mail', value: 'email' },
              { label: 'WhatsApp', value: 'whatsapp' },
            ]}
          />
          <FormikInput
            {...props}
            md={6}
            label="Valor"
            name={`contacts[${index}].value`}
          />
        </Form.Group>
      </Col>
    </Form.Group>
  );
};

const schema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  surname: yup.string().required('Sobrenome obrigatório'),
  contacts: yup.array().of(
    yup.object({
      type: yup.string().required('Tipo obrigatório'),
      value: yup.string().required('Valor obrigatório'),
    }),
  ),
});
