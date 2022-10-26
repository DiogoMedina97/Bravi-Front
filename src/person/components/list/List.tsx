import { useEffect, useState, useCallback } from 'react';
import Table from 'react-bootstrap/Table';

import { PersonEntityInterface } from '../../interface';
import * as service from '../../service';

export const List = () => {
  interface ListState {
    readonly isLoading: boolean;
    readonly people?: PersonEntityInterface[];
  }
  const [state, setState] = useState<ListState>({ isLoading: false });

  const loadData = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true }));
    const people = await service.find();
    setState((s) => ({ ...s, isLoading: false, people }));
  }, []);

  useEffect(() => {
    loadData().catch((err) => console.log(err));
  }, [loadData]);

  const { isLoading, people } = state;

  if (isLoading) return <>Carregando...</>;

  if (!people) return null;

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Nome</th>
          <th>Sobrenome</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person) => (          
          <tr>
            <td></td>
            <td>{person.id}</td>
            <td>{person.name}</td>
            <td>{person.surname}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
