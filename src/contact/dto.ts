interface CreateUpdateDTO {
  readonly type: string;
  readonly value: string;
}

export interface CreateDTO extends CreateUpdateDTO {}
export interface UpdateDTO extends CreateUpdateDTO {
  readonly id: number;
}
