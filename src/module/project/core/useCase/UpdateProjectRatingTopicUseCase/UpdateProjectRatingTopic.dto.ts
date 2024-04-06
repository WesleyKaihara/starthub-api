import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

const TOPIC_VALIDATION = {
  MIN_CHARACTERS_NAME: 3,
  MIN_CHARACTERS_DESCRIPTION: 10,
};

export class UpdateProjectRatingTopicDto {
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

export const UpdateProjectRatingTopicDtoSchema = z
  .object({
    name: z.string().min(TOPIC_VALIDATION.MIN_CHARACTERS_NAME, {
      message: `Rating topic must have at least ${TOPIC_VALIDATION.MIN_CHARACTERS_NAME} characters`,
    }),
    description: z.string().min(TOPIC_VALIDATION.MIN_CHARACTERS_DESCRIPTION, {
      message: `Rating topic description must have at least ${TOPIC_VALIDATION.MIN_CHARACTERS_DESCRIPTION} characters`,
    }),
  })
  .strict();
