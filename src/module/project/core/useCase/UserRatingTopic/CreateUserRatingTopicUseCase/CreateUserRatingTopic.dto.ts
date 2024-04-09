import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class CreateUserRatingTopicDto {
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

export const CreateUserRatingTopicDtoSchema = z
  .object({
    userId: z.number().min(1, {
      message: `User reference must have greater then 0`,
    }),
    projectId: z.number().min(1, {
      message: `Project reference must have greater then 0`,
    }),
    ratingTopicId: z.number().min(1, {
      message: `Rating Topic reference must have greater then 0`,
    }),
    value: z.number().min(1, {
      message: `Value must have greater then 0`,
    }),
  })
  .strict();
