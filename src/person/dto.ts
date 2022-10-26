interface CreateUpdateDTO {
  readonly name: string;
  readonly surname: string;
}

export type CreateDTO = CreateUpdateDTO;
export type UpdateDTO = CreateUpdateDTO;
