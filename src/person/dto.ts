import {
  CreateDTO as ContactCreateDTO,
  UpdateDTO as ContactUpdateDTO,
} from '../contact/dto';

interface CreateUpdateDTO {
  readonly name: string;
  readonly surname: string;
}

export interface CreateDTO extends CreateUpdateDTO {
  readonly contacts: ContactCreateDTO[];
}

export interface UpdateDTO extends CreateUpdateDTO {
  readonly contacts: ContactUpdateDTO[];
}
