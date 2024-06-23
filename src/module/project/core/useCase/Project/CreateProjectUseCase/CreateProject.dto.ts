import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectBody {
  @ApiProperty({
    example: 'StartHub',
  })
  readonly name: string;
  @ApiProperty({
    example:
      'Plataforma destina a auxiliar no processo inicial de desenvolvimento de startups',
  })
  readonly description: string;
  @ApiProperty({
    example: true,
  })
  readonly ative: boolean;
  @ApiProperty({
    example: 1,
  })
  readonly userId!: number;
  @ApiProperty({
    example: '',
  })
  readonly image?: string;
}
