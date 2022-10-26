import axios from 'axios';

import { CreateDTO } from './dto';
import { PersonEntityInterface } from './interface';

const { REACT_APP_API_URL='' } = process.env;

export const create = async (dto: CreateDTO)  => {
  const res = await axios.post(`${REACT_APP_API_URL}/person`, dto);
  return res.data as PersonEntityInterface;
};
