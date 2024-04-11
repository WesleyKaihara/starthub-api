import { ApiProperty } from '@nestjs/swagger';

export class CreateProductBody {
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
