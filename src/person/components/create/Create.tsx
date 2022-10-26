import { useNavigate } from 'react-router-dom';
import { FormikHelpers } from 'formik';

import { PersonForm } from '../form/Form';

import { CreateDTO } from '../../dto';
import * as service from '../../service';

type FormValues = CreateDTO;

export const Create = () => {
  const navigate = useNavigate();

  const onSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    await service.create(values);
    setSubmitting(false);
    navigate('..');
  };

  return (
    <PersonForm<FormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
};

const initialValues: FormValues = {
  name: '',
  surname: '',
};
