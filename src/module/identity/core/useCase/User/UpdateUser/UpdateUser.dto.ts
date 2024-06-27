import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserBody {
  @ApiProperty({
    example: 'Nome Atualizado',
  })
  readonly name: string;

  @ApiProperty({
    example: '000.000.000-00',
  })
  readonly cpf: string;
}
