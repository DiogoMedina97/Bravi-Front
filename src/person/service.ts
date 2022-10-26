import axios from 'axios';

import { CreateDTO } from './dto';
import { PersonEntityInterface } from './interface';

const { REACT_APP_API_URL='' } = process.env;


export const find = async ()  => {
  const res = await axios.get(`${REACT_APP_API_URL}/person`);
  return res.data as PersonEntityInterface[];
};

export const create = async (dto: CreateDTO)  => {
  const res = await axios.post(`${REACT_APP_API_URL}/person`, dto);
  return res.data as PersonEntityInterface;
};
