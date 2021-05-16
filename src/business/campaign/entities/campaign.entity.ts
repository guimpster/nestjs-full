export class Campaign {
  id: string;
  status: string;
  source: string;
  criada_em: Date;

  constructor(partial: Partial<Campaign>) {
    Object.assign(this, partial);
  }
}
