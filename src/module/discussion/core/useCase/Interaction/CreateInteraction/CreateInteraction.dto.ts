import { ApiProperty } from '@nestjs/swagger';

export class CreateInteractionBody {
  @ApiProperty({
    example: 1,
  })
  readonly discussionId: number;
  @ApiProperty({
    example: '',
  })
  readonly message: string;
}
