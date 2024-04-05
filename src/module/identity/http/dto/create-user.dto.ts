import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class CreateUserDto {
  @ApiProperty({
    example: 'João Paulo',
  })
  readonly name: string;
  @ApiProperty({
    example: 'joao.paulo@email.com',
  })
  readonly email: string;
  @ApiProperty({
    example: 'Joaopaulo123',
  })
  password: string;
}

export const CreateUserDtoSchema = z
  .object({
    name: z.string(),
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z
      .string()
      .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
  })
  .strict();
