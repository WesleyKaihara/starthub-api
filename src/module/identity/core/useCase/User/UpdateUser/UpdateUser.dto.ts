import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserBody {
  @ApiProperty({
    example: 'Nome Atualizado',
  })
  readonly name: string;
}
