import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export default class AtualizarUserDto {
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

export const UpdateUserDtoSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z
      .string()
      .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
  })
  .strict();
