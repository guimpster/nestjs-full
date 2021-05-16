/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateMessageInput {
  num_cliente?: number;
  cpf_cliente?: string;
}

export abstract class IQuery {
  abstract message(id: string): Message | Promise<Message>;
}

export abstract class IMutation {
  abstract createMessage(createMessageInput?: CreateMessageInput): Message | Promise<Message>;
}

export class Message {
  id?: string;
  num_cliente?: number;
  cpf_cliente?: string;
  status?: string;
  source?: string;
  criada_em?: Date;
}
