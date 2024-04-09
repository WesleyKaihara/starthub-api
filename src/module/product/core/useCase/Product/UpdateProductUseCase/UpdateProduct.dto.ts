import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

const PRODUCT_VALIDATION = {
  MIN_CHARACTERS_NAME: 3,
  MIN_CHARACTERS_DESCRIPTION: 10,
};

export class UpdateProductDto {
  @ApiProperty({
    example: '5 Sugestões para projeto',
  })
  readonly name: string;
  @ApiProperty({
    example:
      'Retorna algumas sugestões baseadas no cenário do projeto utilizando IA',
  })
  readonly description: string;
  @ApiProperty({
    example: 10,
  })
  readonly value: number;
}

export const UpdateProductDtoSchema = z
  .object({
    name: z.string().min(PRODUCT_VALIDATION.MIN_CHARACTERS_NAME, {
      message: `Product name must have at least ${PRODUCT_VALIDATION.MIN_CHARACTERS_NAME} characters`,
    }),
    description: z.string().min(PRODUCT_VALIDATION.MIN_CHARACTERS_DESCRIPTION, {
      message: `Product description must have at least ${PRODUCT_VALIDATION.MIN_CHARACTERS_DESCRIPTION} characters`,
    }),
    value: z.number().min(0),
  })
  .strict();
