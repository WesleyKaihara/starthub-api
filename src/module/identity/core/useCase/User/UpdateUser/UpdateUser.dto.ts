import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserBody {
  @ApiProperty({
    example: 'Nome Atualizado',
  })
  readonly name: string;
  @ApiProperty({
    example: 'joao.paulo@email.com',
  })
  readonly email: string;
  @ApiProperty({
    example: 'NovaSenha123',
  })
  readonly password: string;
}
