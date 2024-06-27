import { ApiProperty } from '@nestjs/swagger';

export class CreateUserBody {
  @ApiProperty({
    example: 'João Paulo',
  })
  readonly name: string;

  @ApiProperty({
    example: '000.000.000-00',
  })
  readonly cpf: string;

  @ApiProperty({
    example: 'joao.paulo@email.com',
  })
  readonly email: string;

  @ApiProperty({
    example: 'Joaopaulo123',
  })
  password: string;
}
