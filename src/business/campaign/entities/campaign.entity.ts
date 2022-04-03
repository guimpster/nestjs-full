export class Campaign {
  id: string;
  status: string;
  source: string;
  created_at: Date;

  constructor(partial: Partial<Campaign>) {
    Object.assign(this, partial);
  }
}
