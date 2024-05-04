import { ApiProperty } from '@nestjs/swagger';

export class UpdateInteractionBody {
  @ApiProperty({
    example: 1,
  })
  readonly discussionId: number;
  @ApiProperty({
    example: '',
  })
  readonly message: string;
  @ApiProperty({
    example: 1,
  })
  readonly userId: number;
}
