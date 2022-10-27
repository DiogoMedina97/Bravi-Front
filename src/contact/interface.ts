import { PersonEntityInterface } from '../person/interface';

export interface ContactEntityInterface {
  readonly id: number;
  readonly type: string;
  readonly value: string;
  readonly person: PersonEntityInterface;
}
