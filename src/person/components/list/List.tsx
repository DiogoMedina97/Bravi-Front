import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { faEdit, faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PersonEntityInterface } from '../../interface';
import * as service from '../../service';

export const List = () => (
  <>
    <Link to="create">
      <Button
        type="button"
        variant="success"
        className="mb-3"
      >
        Criar
      </Button>
    </Link>
    <ListTable />
  </>
);

const ListTable = () => {
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

  const onRemove = useCallback((id: number) => async () => {
    await service.remove(id);
    // force refresh
    await loadData();
  }, [loadData]);

  const { isLoading, people } = state;

  if (isLoading) return <div>Carregando...</div>;

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
            <td width="200">
              <div className="d-flex justify-content-center">
                <Link to={`update/${person.id}`} className="mx-1">
                  <FontAwesomeIcon icon={faEdit} /> Editar
                </Link>
                <Button
                  type="button"
                  className="mx-1 p-0 border-0"
                  variant="link"
                  onClick={onRemove(person.id)}
                >
                  <FontAwesomeIcon icon={faBan} /> Remover
                </Button>
              </div>
            </td>
            <td>{person.id}</td>
            <td>{person.name}</td>
            <td>{person.surname}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
