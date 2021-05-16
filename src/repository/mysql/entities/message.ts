import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  constructor(partial: Partial<Message>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  num_cliente: number;

  @Column({ length: 255 })
  cpf_cliente: string;

  @Column({ length: 255 })
  status: string;

  @Column({ length: 255 })
  source: string;

  @Column('date')
  criada_em: Date;
}
