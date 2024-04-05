import { ApiProperty } from '@nestjs/swagger';

export default class SignInDto {
  @ApiProperty({
    example: 'email@email.com',
  })
  readonly email: string;
  @ApiProperty({
    example: 'Senha123',
  })
  readonly password: string;
}
