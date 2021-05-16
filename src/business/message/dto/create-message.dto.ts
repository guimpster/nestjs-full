import { IsString, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  readonly num_cliente: number;

  @IsString()
  readonly cpf_cliente: string;
}
