import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik';

import { PersonForm } from '../form/Form';

import { UpdateDTO } from '../../dto';
import { PersonEntityInterface } from '../../interface';
import * as service from '../../service';

type FormValues = UpdateDTO;

export const Update = () => {
  const { id='' } = useParams();
  const idNumber = Number.parseInt(id, 10);

  interface ListState {
    readonly isLoading: boolean;
    readonly person?: PersonEntityInterface;
  }
  const [state, setState] = useState<ListState>({ isLoading: false });
  const navigate = useNavigate();

  const onSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    await service.update(idNumber, values);
    setSubmitting(false);
    navigate('..');
  };

  const loadData = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true }));
    const person = await service.findById(idNumber);
    setState((s) => ({ ...s, isLoading: false, person }));
  }, [idNumber]);

  useEffect(() => {
    loadData().catch((err) => console.log(err));
  }, [loadData]);

  const { isLoading, person } = state;

  if (isLoading) return <>Carregando...</>;

  if (!person) return null;

  return (
    <PersonForm<FormValues>
      initialValues={person}
      onSubmit={onSubmit}
    />
  );
};
