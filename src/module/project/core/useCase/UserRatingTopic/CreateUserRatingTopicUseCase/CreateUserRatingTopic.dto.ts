import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRatingTopicBody {
  @ApiProperty({
    example: 1,
  })
  readonly userId: number;
  @ApiProperty({
    example: 1,
  })
  readonly projectId: number;
  @ApiProperty({
    example: 1,
  })
  readonly ratingTopicId: number;
  @ApiProperty({
    example: 8,
  })
  readonly value: number;
}
