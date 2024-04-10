import { ApiProperty } from '@nestjs/swagger';

export class UpdateRatingTopicBody {
  @ApiProperty({
    example: 'Inovação',
  })
  readonly name: string;
  @ApiProperty({
    example:
      'Inovar é criar algo novo, é introduzir novidades, renovar, recriar.',
  })
  readonly description: string;
}
