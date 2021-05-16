export class Message {
  id: string;
  num_cliente: number;
  cpf_cliente: string;
  status: string;
  source: string;
  criada_em: Date;

  constructor(partial: Partial<Message>) {
    Object.assign(this, partial);
  }
}
